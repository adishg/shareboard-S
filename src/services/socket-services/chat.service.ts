import { SocketEvents } from "../../constants/constants";
import { SocketService } from "./socket.service";

export class ChatService extends SocketService {
  private static _chatService: ChatService;

  constructor(config: {
    socketUrl: string;
    options: SocketIOClient.ConnectOpts;
  }) {
    super(config.socketUrl, config.options);
  }

  public static get chatService() {
    if (this._chatService) {
      return this._chatService;
    }
    const config = {
      socketUrl: process.env.REACT_APP_SOCKET_SERVER_URL,
      options: {},
    };
    return (this._chatService = new this(config));
  }

  initChatRoom = () => {
    this._socket.on(SocketEvents.INIT_ROOM_CHAT, () => {
      console.info("Room Init");
    });
  };

  joinGroup = (payload: any, joinGroupHandler: Function) => {
    this._socket.emit(SocketEvents.JOIN_GROUP, payload, (response: any) => {
      if (joinGroupHandler) {
        joinGroupHandler(true);
      }
    });
  };

  listenNewMessages = (newMessageHandler: Function) => {
    this._socket.on(SocketEvents.NEW_MESSAGE, (response: any) => {
      newMessageHandler(response);
    });
  };

  offNewMessages = () => {
    this._socket.off(SocketEvents.NEW_MESSAGE);
  };

  sendMessage = (payload: any) => {
    this._socket.emit(SocketEvents.CREATE_MESSAGE, payload, (response: any) => {
      console.info(response);
    });
  };
}
