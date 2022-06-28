import { useSocketServer } from "socket-controllers";
import { MainController } from "./api/controllers/mainController";
import { RoomController } from "./api/controllers/roomController";
import { GameController } from "./api/controllers/GameController";
import { AuthController } from "./api/controllers/AuthController";
import { LeaderboardController } from "./api/controllers/LeaderboardController";
import { ChatController } from "./api/controllers/ChatController";
import { Server } from "socket.io"

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  })
  useSocketServer(io, { controllers: [MainController, RoomController, GameController, AuthController, LeaderboardController, ChatController] });
  return io;
}