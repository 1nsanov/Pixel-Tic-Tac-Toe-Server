"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
const UserSchema = require("./MongoDB/Schemas/UserSchema");
let AuthController = class AuthController {
    async userRegister(socket, message) {
        let userResponse = message.newUser;
        let userExists = await UserSchema.findOne({ name: userResponse.name });
        console.log("Registering user: ", userResponse);
        if (userExists) {
            socket.emit("user_register_error", { error: "User already exists" });
        }
        else if (userResponse.name.length < 4 && userResponse.password.length < 4) {
            socket.emit("user_register_error", {
                error: "ERROR: Name and password must be at least 3 characters long"
            });
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
            });
        }
    }
    async userLogin(socket, message) {
        let userResponse = message.user;
        let userExists = await UserSchema.findOne({ name: userResponse.name, password: userResponse.password });
        if (userExists) {
            console.log("User logged in: ", userResponse);
            socket.emit("user_login_success", { user: userResponse });
        }
        else {
            console.log("User not found: ", userResponse);
            socket.emit("user_login_error", { error: "User not found" });
        }
    }
};
__decorate([
    (0, socket_controllers_1.OnMessage)("user_register"),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __param(1, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("user_login"),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __param(1, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
AuthController = __decorate([
    (0, socket_controllers_1.SocketController)()
], AuthController);
exports.AuthController = AuthController;
