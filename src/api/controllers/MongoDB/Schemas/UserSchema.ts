import mongoose, { Schema } from "mongoose";
import IUserModel from "../../models/IUserModel";

const userSchema = new Schema<IUserModel>({ 
  name: String,
  password: String,
});
const user = mongoose.model<IUserModel>("user", userSchema);
module.exports = user;