"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_controllers_1 = require("socket-controllers");
const mainController_1 = require("./api/controllers/mainController");
const roomController_1 = require("./api/controllers/roomController");
const GameController_1 = require("./api/controllers/GameController");
const AuthController_1 = require("./api/controllers/AuthController");
const socket_io_1 = require("socket.io");
exports.default = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        }
    });
    (0, socket_controllers_1.useSocketServer)(io, { controllers: [mainController_1.MainController, roomController_1.RoomController, GameController_1.GameController, AuthController_1.AuthController] });
    return io;
};
