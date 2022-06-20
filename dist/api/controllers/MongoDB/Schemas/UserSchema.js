"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    password: String,
});
const user = mongoose_1.default.model("user", userSchema);
module.exports = user;
