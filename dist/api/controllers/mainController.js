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
exports.MainController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
const ConnectDB_1 = require("./MongoDB/ConnectDB");
let MainController = class MainController {
    onConnection(socket, io) {
        console.log("New Socket Connection", socket.id);
    }
    async checkStatusDB(socket) {
        if (ConnectDB_1.ConnectDB.IsConnectDB) {
            socket.emit("check_status_db_success", { statusDB: true });
        }
        else {
            socket.emit("check_status_db_error", { statusDB: false });
        }
    }
    onDisconnect(socket) {
        console.log('Client disconnected', socket.id);
    }
};
__decorate([
    (0, socket_controllers_1.OnConnect)(),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __param(1, (0, socket_controllers_1.SocketIO)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, socket_io_1.Server]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "onConnection", null);
__decorate([
    (0, socket_controllers_1.OnMessage)("check_status_db"),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "checkStatusDB", null);
__decorate([
    (0, socket_controllers_1.OnDisconnect)(),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "onDisconnect", null);
MainController = __decorate([
    (0, socket_controllers_1.SocketController)()
], MainController);
exports.MainController = MainController;
