import mongoose from "mongoose";
import { ConnectedSocket, MessageBody, OnMessage, SocketController } from "socket-controllers";
import { Socket } from "socket.io";
import IAuthUser from "./models/authModels/IAuthUser";
import IUserLogin from "./models/authModels/IUserLogin";
const AuthUserSchema = require("./MongoDB/Schemas/AuthUserSchema") as mongoose.Model<IAuthUser>;

@SocketController()
export class AuthController {

  @OnMessage("user_register")
  public async userRegister(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    let authUserResponse = message.authUser as IAuthUser;
    console.log("Registering user... ", authUserResponse);

    let userExists = await AuthUserSchema.findOne({ Nickname: authUserResponse.Nickname });
    if (userExists) {
      socket.emit("user_register_error", { error: "User already exists" });
    }
    else if (authUserResponse.Nickname.length < 4 && authUserResponse.Password.length < 6) {
      socket.emit("user_register_error", {
        error: "Nickname must be at least 4 characters\nPassword must be at least 6 characters\n"
      })
    }
    else {
      console.log("User name and password is valid");
      const AuthUser = new AuthUserSchema({
        UserId: authUserResponse.UserId,
        Nickname: authUserResponse.Nickname,
        Password: authUserResponse.Password,
        AvatarId: authUserResponse.AvatarId,
        CountFinishedGames: authUserResponse.CountFinishedGames,
        CountWins: authUserResponse.CountWins,
        CountLosses: authUserResponse.CountLosses,
        Score: authUserResponse.Score,
        StatusOnline: authUserResponse.StatusOnline,
        DataRegister: authUserResponse.DataRegister
      });
      console.log("Add user to DB: ", AuthUser);
      AuthUser.save().then(() => {
        socket.emit("user_register_success",  authUserResponse);
      })
    }
  }

  @OnMessage("user_login")
  public async userLogin(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    let authUserResponse = message.authUser as IUserLogin;
    let userExists = await AuthUserSchema.findOne({ Nickname: authUserResponse.Nickname });
    if(userExists){
      if (userExists.Password === authUserResponse.Password) {
        console.log("User logged in: ", authUserResponse);
        socket.emit("user_login_success", userExists);
      }
      else{
        socket.emit("user_login_error", { error: "Password is incorrect." });
      }
    }
    else{
      console.log("User not found: ", authUserResponse);
      socket.emit("user_login_error", { error: "There is no user with this nickname." });
    }
  }
}