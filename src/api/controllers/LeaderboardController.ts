import mongoose from "mongoose";
import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import IAuthUser from "./models/authModels/IAuthUser";
import ILeaderboardItem from "./models/leaderboard/ILeaderboardItem";
const AuthUserSchema = require("./MongoDB/Schemas/AuthUserSchema") as mongoose.Model<IAuthUser>;

@SocketController()
export class LeaderboardController {

  @OnMessage("get_leaderboard")
  public async getLeaderboard(@ConnectedSocket() socket: Socket) {
    try {
      let listUser = await AuthUserSchema.find();
      let leaderboard: ILeaderboardItem[] = [];
      listUser.forEach(user => {
        leaderboard.push({
          UserId: user.UserId,
          Nickname: user.Nickname,
          AvatarId: user.AvatarId,
          CountFinishedGames: user.CountFinishedGames,
          CountWins: user.CountWins,
          CountLosses: user.CountLosses,
          Score: user.Score
        })
      });
      socket.emit("get_leaderboard_success", { leaderboard: leaderboard })
    } catch (error) {
      socket.emit("get_leaderboard_error", { error: "Error get leaderboard" })
    }

  }
}
