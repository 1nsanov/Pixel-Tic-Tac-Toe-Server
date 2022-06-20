import { ConnectedSocket, OnConnect, OnDisconnect, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";

@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(@ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
    console.log("New Socket Connection ", socket.id);
  }

  @OnDisconnect()
  public onDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('client disconnected ', socket.id);
  }
}