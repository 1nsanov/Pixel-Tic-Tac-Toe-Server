"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AuthUserSchema = new mongoose_1.Schema({
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
const user = mongoose_1.default.model("user", AuthUserSchema);
module.exports = user;
