import socketIOClient from "socket.io-client";
export class SocketService {
  protected _socket;
  constructor(socketUrl: string, options: SocketIOClient.ConnectOpts) {
    this._socket = socketIOClient(socketUrl, options);
    console.info("Connecting to new Socket...");
  }
}
