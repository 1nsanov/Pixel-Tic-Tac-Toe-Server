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
exports.GameController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
const AuthUserSchema = require("./MongoDB/Schemas/AuthUserSchema");
let GameController = class GameController {
    getSocketGameRoom(socket) {
        const socketRooms = Array.from(socket.rooms.values()).filter(room => room !== socket.id);
        const gameRoom = socketRooms && socketRooms[0];
        return gameRoom;
    }
    async updateGame(io, socket, message) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit("on_game_update", message);
    }
    async gameWin(io, socket, message) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit("on_game_win", message);
        await AuthUserSchema.updateOne();
    }
    async setResultGame(io, socket, message) {
        console.log(message);
        let resultGame = message;
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
};
__decorate([
    (0, socket_controllers_1.OnMessage)("update_game"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("game_win"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "gameWin", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("set_result_game"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "setResultGame", null);
GameController = __decorate([
    (0, socket_controllers_1.SocketController)()
], GameController);
exports.GameController = GameController;
