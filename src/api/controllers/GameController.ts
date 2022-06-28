import e = require("cors");
import mongoose from "mongoose";
import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import IAuthUser from "./models/authModels/IAuthUser";
import IResultGame from "./models/gameModels/IResultGame";
const AuthUserSchema = require("./MongoDB/Schemas/AuthUserSchema") as mongoose.Model<IAuthUser>;


@SocketController()
export class GameController {
  private getSocketGameRoom(socket: Socket): string {
    const socketRooms = Array.from(socket.rooms.values()).filter(room => room !== socket.id);
    const gameRoom = socketRooms && socketRooms[0]
    return gameRoom;
  }


  @OnMessage("update_game")
  public async updateGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_update", message);
  }

  @OnMessage("game_win")
  public async gameWin(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_win", message);

    await AuthUserSchema.updateOne()
  }

  @OnMessage("set_result_game")
  public async setResultGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    console.log(message);
    let resultGame = message as IResultGame;
    let user = await AuthUserSchema.findOne({ UserId: resultGame.UserId });
    user.CountFinishedGames = user.CountFinishedGames + 1;
    if (resultGame.IsWin) {
      user.CountWins = user.CountWins + 1;
      user.Score = user.Score + 10;
    }
    else {
      user.CountLosses = user.CountLosses + 1;
      user.Score = user.Score - 10;
    }
    await user.save();
  }
}
