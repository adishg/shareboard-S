import oc from "open-color";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_ALIGN,
} from "./constants";
import { t } from "./i18n";
import { AppState, FlooredNumber, NormalizedZoomValue } from "./types";
import { getDateTime } from "./utils";

export const getDefaultAppState = (): Omit<
  AppState,
  "offsetTop" | "offsetLeft"
> => {
  return {
    appearance: "light",
    collaborators: new Map(),
    currentChartType: "bar",
    currentItemBackgroundColor: "transparent",
    currentItemEndArrowhead: "arrow",
    currentItemFillStyle: "hachure",
    currentItemFontFamily: DEFAULT_FONT_FAMILY,
    currentItemFontSize: DEFAULT_FONT_SIZE,
    currentItemLinearStrokeSharpness: "round",
    currentItemOpacity: 100,
    currentItemRoughness: 1,
    currentItemStartArrowhead: null,
    currentItemStrokeColor: oc.black,
    currentItemStrokeSharpness: "sharp",
    currentItemStrokeStyle: "solid",
    currentItemStrokeWidth: 1,
    currentItemTextAlign: DEFAULT_TEXT_ALIGN,
    cursorButton: "up",
    draggingElement: null,
    editingElement: null,
    editingGroupId: null,
    editingLinearElement: null,
    elementLocked: false,
    elementType: "selection",
    errorMessage: null,
    exportBackground: true,
    exportEmbedScene: false,
    fileHandle: null,
    gridSize: null,
    height: window.innerHeight,
    isBindingEnabled: true,
    isLibraryOpen: false,
    isLoading: false,
    isResizing: false,
    isRotating: false,
    lastPointerDownWith: "mouse",
    multiElement: null,
    name: `${t("labels.untitled")}-${getDateTime()}`,
    openMenu: null,
    pasteDialog: { shown: false, data: null },
    previousSelectedElementIds: {},
    resizingElement: null,
    scrolledOutside: false,
    scrollX: 0 as FlooredNumber,
    scrollY: 0 as FlooredNumber,
    selectedElementIds: {},
    selectedGroupIds: {},
    selectionElement: null,
    shouldAddWatermark: false,
    shouldCacheIgnoreZoom: false,
<<<<<<< HEAD
    showHelpDialog: false,
=======
    showShortcutsDialog: false,
>>>>>>> 0afb0687a07404181f555f0c1cda5f9082505cb5
    showStats: false,
    startBoundElement: null,
    suggestedBindings: [],
    toastMessage: null,
    viewBackgroundColor: oc.white,
    width: window.innerWidth,
    zenModeEnabled: false,
    zoom: { value: 1 as NormalizedZoomValue, translation: { x: 0, y: 0 } },
  };
};

/**
 * Config containing all AppState keys. Used to determine whether given state
 *  prop should be stripped when exporting to given storage type.
 */
const APP_STATE_STORAGE_CONF = (<
  Values extends {
    /** whether to keep when storing to browser storage (localStorage/IDB) */
    browser: boolean;
    /** whether to keep when exporting to file/database */
    export: boolean;
  },
  T extends Record<keyof AppState, Values>
>(
  config: { [K in keyof T]: K extends keyof AppState ? T[K] : never },
) => config)({
  appearance: { browser: true, export: false },
  collaborators: { browser: false, export: false },
  currentChartType: { browser: true, export: false },
  currentItemBackgroundColor: { browser: true, export: false },
  currentItemEndArrowhead: { browser: true, export: false },
  currentItemFillStyle: { browser: true, export: false },
  currentItemFontFamily: { browser: true, export: false },
  currentItemFontSize: { browser: true, export: false },
  currentItemLinearStrokeSharpness: { browser: true, export: false },
  currentItemOpacity: { browser: true, export: false },
  currentItemRoughness: { browser: true, export: false },
  currentItemStartArrowhead: { browser: true, export: false },
  currentItemStrokeColor: { browser: true, export: false },
  currentItemStrokeSharpness: { browser: true, export: false },
  currentItemStrokeStyle: { browser: true, export: false },
  currentItemStrokeWidth: { browser: true, export: false },
  currentItemTextAlign: { browser: true, export: false },
  cursorButton: { browser: true, export: false },
  draggingElement: { browser: false, export: false },
  editingElement: { browser: false, export: false },
  editingGroupId: { browser: true, export: false },
  editingLinearElement: { browser: false, export: false },
  elementLocked: { browser: true, export: false },
  elementType: { browser: true, export: false },
  errorMessage: { browser: false, export: false },
  exportBackground: { browser: true, export: false },
  exportEmbedScene: { browser: true, export: false },
  fileHandle: { browser: false, export: false },
  gridSize: { browser: true, export: true },
  height: { browser: false, export: false },
  isBindingEnabled: { browser: false, export: false },
  isLibraryOpen: { browser: false, export: false },
  isLoading: { browser: false, export: false },
  isResizing: { browser: false, export: false },
  isRotating: { browser: false, export: false },
  lastPointerDownWith: { browser: true, export: false },
  multiElement: { browser: false, export: false },
  name: { browser: true, export: false },
  offsetLeft: { browser: false, export: false },
  offsetTop: { browser: false, export: false },
  openMenu: { browser: true, export: false },
  pasteDialog: { browser: false, export: false },
  previousSelectedElementIds: { browser: true, export: false },
  resizingElement: { browser: false, export: false },
  scrolledOutside: { browser: true, export: false },
  scrollX: { browser: true, export: false },
  scrollY: { browser: true, export: false },
  selectedElementIds: { browser: true, export: false },
  selectedGroupIds: { browser: true, export: false },
  selectionElement: { browser: false, export: false },
  shouldAddWatermark: { browser: true, export: false },
  shouldCacheIgnoreZoom: { browser: true, export: false },
<<<<<<< HEAD
  showHelpDialog: { browser: false, export: false },
=======
  showShortcutsDialog: { browser: false, export: false },
>>>>>>> 0afb0687a07404181f555f0c1cda5f9082505cb5
  showStats: { browser: true, export: false },
  startBoundElement: { browser: false, export: false },
  suggestedBindings: { browser: false, export: false },
  toastMessage: { browser: false, export: false },
  viewBackgroundColor: { browser: true, export: true },
  width: { browser: false, export: false },
  zenModeEnabled: { browser: true, export: false },
  zoom: { browser: true, export: false },
});

const _clearAppStateForStorage = <ExportType extends "export" | "browser">(
  appState: Partial<AppState>,
  exportType: ExportType,
) => {
  type ExportableKeys = {
    [K in keyof typeof APP_STATE_STORAGE_CONF]: typeof APP_STATE_STORAGE_CONF[K][ExportType] extends true
      ? K
      : never;
  }[keyof typeof APP_STATE_STORAGE_CONF];
  const stateForExport = {} as { [K in ExportableKeys]?: typeof appState[K] };
  for (const key of Object.keys(appState) as (keyof typeof appState)[]) {
    const propConfig = APP_STATE_STORAGE_CONF[key];
    if (propConfig?.[exportType]) {
      // @ts-ignore see https://github.com/microsoft/TypeScript/issues/31445
      stateForExport[key] = appState[key];
    }
  }
  return stateForExport;
};

export const clearAppStateForLocalStorage = (appState: Partial<AppState>) => {
  return _clearAppStateForStorage(appState, "browser");
};

export const cleanAppStateForExport = (appState: Partial<AppState>) => {
  return _clearAppStateForStorage(appState, "export");
};
