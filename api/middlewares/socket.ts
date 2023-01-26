import { Server, Socket } from "socket.io";
import { Request, Response, NextFunction } from "express";
import createApp from "../../server";
import chattingDao from "../models/chattingDao";

export const socketIo = async (request: Request, response: Response, next: NextFunction) => {
  const io = new Server(await createApp.getServer(), {
    path: "/chatting",
    cors: {
      origin: "*",
    },
  });

  let userId: string;
  let roomId: string;

  io.of("/chatting").on("connection", (socket: Socket) => {
    console.log(`New client connected with id: ${socket.id}`);
    socket.onAny((event) => {
      console.log(event);
    });

    userId = socket.handshake.query.userId as string;
    roomId = socket.handshake.query.roomId as string;

    socket.join(roomId);
    console.log(socket.rooms);

    io.of("/chatting").to(roomId).emit("welcome", `User ${socket.id} has joined the ${roomId} room`);

    socket.on("leave", (roomName: any) => {
      socket.leave(roomName);
      io.to(roomName).emit("message", `User ${socket.id} has left the ${roomName} room`);
    });

    socket.on("message", async (msg: any) => {
      console.log(`Received message: ${msg}`);
      console.log(socket.rooms);

      await chattingDao.messageData(msg, userId, roomId);

      io.of("/chatting").to(roomId).emit("newMessage", msg);
    });

    socket.on("disconnecting", () => {
      console.log(`Client disconnected with id: ${socket.id}`);

      socket.rooms.forEach((room) => io.of("/chatting").to(room).emit("bye", `User ${socket.id} has left the room`));
    });
  });
  next();
};
