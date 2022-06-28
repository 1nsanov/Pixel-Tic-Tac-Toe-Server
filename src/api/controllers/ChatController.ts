import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class ChatController {
  private getSocketGameRoom(socket: Socket): string{
    const socketRooms = Array.from(socket.rooms.values()).filter(room => room !== socket.id);
    const gameRoom = socketRooms && socketRooms[0]
    return gameRoom;
  }

  @OnMessage("send_message")
  public async sendMessage(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    console.log("Recieve message:", message);
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_send_message", message)
  }
}
