import { ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";
import { ConnectDB } from "./MongoDB/ConnectDB";
@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(@ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
    console.log("New Socket Connection", socket.id);
  }

  @OnMessage("check_status_db")
  public async checkStatusDB(@ConnectedSocket() socket: Socket) {
    if (ConnectDB.IsConnectDB) {
      socket.emit("check_status_db_success", { statusDB: true })
    }
    else {
      socket.emit("check_status_db_error", { statusDB: false })
    }
  }

  @OnDisconnect()
  public onDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('Client disconnected', socket.id);
  }
}