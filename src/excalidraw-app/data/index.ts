import { serializeAsJSON } from "../../data/json";
import { restore } from "../../data/restore";
import { ImportedDataState } from "../../data/types";
import { ExcalidrawElement } from "../../element/types";
import { t } from "../../i18n";
import { AppState } from "../../types";

const byteToHex = (byte: number): string => `0${byte.toString(16)}`.slice(-2);

const BACKEND_GET = process.env.REACT_APP_BACKEND_V1_GET_URL;
const BACKEND_V2_GET = process.env.REACT_APP_BACKEND_V2_GET_URL;
const BACKEND_V2_POST = process.env.REACT_APP_BACKEND_V2_POST_URL;

const generateRandomID = async () => {
  const arr = new Uint8Array(10);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join("");
};

const generateEncryptionKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 128,
    },
    true, // extractable
    ["encrypt", "decrypt"],
  );
  return (await window.crypto.subtle.exportKey("jwk", key)).k;
};

export const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER_URL;

export type EncryptedData = {
  data: ArrayBuffer;
  iv: Uint8Array;
};

export type SocketUpdateDataSource = {
  SCENE_INIT: {
    type: "SCENE_INIT";
    payload: {
      elements: readonly ExcalidrawElement[];
    };
  };
  SCENE_UPDATE: {
    type: "SCENE_UPDATE";
    payload: {
      elements: readonly ExcalidrawElement[];
    };
  };
  MOUSE_LOCATION: {
    type: "MOUSE_LOCATION";
    payload: {
      socketId: string;
      pointer: { x: number; y: number };
      button: "down" | "up";
      selectedElementIds: AppState["selectedElementIds"];
      username: string;
    };
  };
};

export type SocketUpdateDataIncoming =
  | SocketUpdateDataSource[keyof SocketUpdateDataSource]
  | {
      type: "INVALID_RESPONSE";
    };

export type SocketUpdateData = SocketUpdateDataSource[keyof SocketUpdateDataSource] & {
  _brand: "socketUpdateData";
};

export const createIV = () => {
  const arr = new Uint8Array(12);
  return window.crypto.getRandomValues(arr);
};

export const encryptAESGEM = async (
  data: Uint8Array,
  key: string,
): Promise<EncryptedData> => {
  const importedKey = await getImportedKey(key, "encrypt");
  const iv = createIV();
  return {
    data: await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      importedKey,
      data,
    ),
    iv,
  };
};

export const decryptAESGEM = async (
  data: ArrayBuffer,
  key: string,
  iv: Uint8Array,
): Promise<SocketUpdateDataIncoming> => {
  try {
    const importedKey = await getImportedKey(key, "decrypt");
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      importedKey,
      data,
    );

    const decodedData = new TextDecoder("utf-8").decode(
      new Uint8Array(decrypted) as any,
    );
    return JSON.parse(decodedData);
  } catch (error) {
    window.alert(t("alerts.decryptFailed"));
    console.error(error);
  }
  return {
    type: "INVALID_RESPONSE",
  };
};

export const getCollaborationLinkData = (link: string) => {
  if (link.length === 0) {
    return;
  }
  const hash = new URL(link).hash;
  return hash.match(/^#room=([a-zA-Z0-9_-]+),([a-zA-Z0-9_-]+)$/);
};

export const generateCollaborationLink = async () => {
  const id = await generateRandomID();
  const key = await generateEncryptionKey();
  return `${window.location.origin}${window.location.pathname}#room=${id},${key}`;
};

export const getImportedKey = (key: string, usage: KeyUsage) =>
  window.crypto.subtle.importKey(
    "jwk",
    {
      alg: "A128GCM",
      ext: true,
      k: key,
      key_ops: ["encrypt", "decrypt"],
      kty: "oct",
    },
    {
      name: "AES-GCM",
      length: 128,
    },
    false, // extractable
    [usage],
  );

const importFromBackend = async (
  id: string | null,
  privateKey?: string | null,
): Promise<ImportedDataState> => {
  try {
    const response = await fetch(
      privateKey ? `${BACKEND_V2_GET}${id}` : `${BACKEND_GET}${id}.json`,
    );
    if (!response.ok) {
      window.alert(t("alerts.importBackendFailed"));
      return {};
    }
    let data: ImportedDataState;
    if (privateKey) {
      const buffer = await response.arrayBuffer();
      const key = await getImportedKey(privateKey, "decrypt");
      const iv = new Uint8Array(12);
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        buffer,
      );
      // We need to convert the decrypted array buffer to a string
      const string = new window.TextDecoder("utf-8").decode(
        new Uint8Array(decrypted) as any,
      );
      data = JSON.parse(string);
    } else {
      // Legacy format
      data = await response.json();
    }

    return {
      elements: data.elements || null,
      appState: data.appState || null,
    };
  } catch (error) {
    window.alert(t("alerts.importBackendFailed"));
    console.error(error);
    return {};
  }
};

export const loadScene = async (
  id: string | null,
  privateKey: string | null,
  // Supply initialData even if importing from backend to ensure we restore
  // localStorage user settings which we do not persist on server.
  // Non-optional so we don't forget to pass it even if `undefined`.
  initialData: ImportedDataState | undefined | null,
) => {
  let data;
  if (id != null) {
    // the private key is used to decrypt the content from the server, take
    // extra care not to leak it
    data = restore(
      await importFromBackend(id, privateKey),
      initialData?.appState,
    );
  } else {
    data = restore(initialData || null, null);
  }

  return {
    elements: data.elements,
    appState: data.appState,
    commitToHistory: false,
  };
};

export const exportToBackend = async (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
) => {
  const json = serializeAsJSON(elements, appState);
  const encoded = new TextEncoder().encode(json);

  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 128,
    },
    true, // extractable
    ["encrypt", "decrypt"],
  );
  // The iv is set to 0. We are never going to reuse the same key so we don't
  // need to have an iv. (I hope that's correct...)
  const iv = new Uint8Array(12);
  // We use symmetric encryption. AES-GCM is the recommended algorithm and
  // includes checks that the ciphertext has not been modified by an attacker.
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoded,
  );
  // We use jwk encoding to be able to extract just the base64 encoded key.
  // We will hardcode the rest of the attributes when importing back the key.
  const exportedKey = await window.crypto.subtle.exportKey("jwk", key);

  try {
    const response = await fetch(BACKEND_V2_POST, {
      method: "POST",
      body: encrypted,
    });
    const json = await response.json();
    if (json.id) {
      const url = new URL(window.location.href);
      // We need to store the key (and less importantly the id) as hash instead
      // of queryParam in order to never send it to the server
      url.hash = `json=${json.id},${exportedKey.k!}`;
      const urlString = url.toString();
      window.prompt(`????${t("alerts.uploadedSecurly")}`, urlString);
    } else if (json.error_class === "RequestTooLargeError") {
      window.alert(t("alerts.couldNotCreateShareableLinkTooBig"));
    } else {
      window.alert(t("alerts.couldNotCreateShareableLink"));
    }
  } catch (error) {
    console.error(error);
    window.alert(t("alerts.couldNotCreateShareableLink"));
  }
};
