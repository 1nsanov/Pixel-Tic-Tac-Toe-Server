import mongoose, { Schema } from "mongoose";
import IAuthUser from "../../models/authModels/IAuthUser";

const AuthUserSchema = new Schema<IAuthUser>({
  UserId: Number,
  Nickname: String,
  Password: String,
  AvatarId: Number,
  CountFinishedGames: Number,
  CountWins: Number,
  CountLosses: Number,
  Score: Number,
  StatusOnline: Boolean,
  DataRegister: String,
});
const user = mongoose.model<IAuthUser>("user", AuthUserSchema);
module.exports = user;