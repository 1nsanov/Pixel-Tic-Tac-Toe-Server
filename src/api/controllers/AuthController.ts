import mongoose from "mongoose";
import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import IUserModel from "./models/IUserModel";
const UserSchema = require("./MongoDB/Schemas/UserSchema") as mongoose.Model<IUserModel>;

@SocketController()
export class AuthController {

  @OnMessage("user_register")
  public async userRegister(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    let userResponse = message.newUser as IUserModel;
    let userExists = await UserSchema.findOne({ name: userResponse.name });
    console.log("Registering user: ", userResponse);
    if (userExists) {
      socket.emit("user_register_error", { error: "User already exists" });
    }
    else if (userResponse.name.length < 4 && userResponse.password.length < 4) {
      socket.emit("user_register_error", {
        error: "ERROR: Name and password must be at least 3 characters long"
      })
    }
    else {
      console.log("User name and password is valid");
      const user = new UserSchema({
        name: userResponse.name,
        password: userResponse.password
      });
      console.log(user);
      user.save().then(() => {
        socket.emit("user_register_success");
      })
    }
  }

  @OnMessage("user_login")
  public async userLogin(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    let userResponse = message.user as IUserModel;
    let userExists = await UserSchema.findOne({ name: userResponse.name, password: userResponse.password });
    if(userExists){
      console.log("User logged in: ", userResponse);
      socket.emit("user_login_success", { user: userResponse });
    }
    else{
      console.log("User not found: ", userResponse);
      socket.emit("user_login_error", { error: "User not found" });
    }
  }
}