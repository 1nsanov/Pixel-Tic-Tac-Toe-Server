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
const AuthUserSchema = require("./MongoDB/Schemas/AuthUserSchema");
let AuthController = class AuthController {
    async userRegister(socket, message) {
        let authUserResponse = message.authUser;
        console.log("Registering user... ", authUserResponse);
        let userExists = await AuthUserSchema.findOne({ Nickname: authUserResponse.Nickname });
        if (userExists) {
            socket.emit("user_register_error", { error: "User already exists" });
        }
        else if (authUserResponse.Nickname.length < 4 && authUserResponse.Password.length < 6) {
            socket.emit("user_register_error", {
                error: "Nickname must be at least 4 characters\nPassword must be at least 6 characters\n"
            });
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
                socket.emit("user_register_success", authUserResponse);
            });
        }
    }
    async userLogin(socket, message) {
        let authUserResponse = message.authUser;
        let userExists = await AuthUserSchema.findOne({ Nickname: authUserResponse.Nickname });
        if (userExists) {
            if (userExists.Password === authUserResponse.Password) {
                console.log("User logged in: ", authUserResponse);
                socket.emit("user_login_success", userExists);
            }
            else {
                socket.emit("user_login_error", { error: "Password is incorrect." });
            }
        }
        else {
            console.log("User not found: ", authUserResponse);
            socket.emit("user_login_error", { error: "There is no user with this nickname." });
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
