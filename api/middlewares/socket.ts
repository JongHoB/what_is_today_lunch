import { Server, Socket } from "socket.io";
import { Request, Response, NextFunction } from "express";
import createApp from "../../server";
import chattingDao from "../models/chattingDao";

export const socketIo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const io = new Server(await createApp.getServer(), {
    path: "/chatting",
    cors: {
      origin: "*",
    },
  });

  io.of("/chatting").on("connection", async (socket: Socket) => {
    console.log(`New client connected with id: ${socket.id}`);
    socket.onAny((event) => {
      console.log(event);
    });

    socket.join(socket.handshake.query.roomId as string);
    console.log(socket.rooms);

    const history = await chattingDao.messageHistory(
      socket.handshake.query.roomId as string
    );

    io.of("/chatting")
      .to(socket.handshake.query.roomId as string)
      .emit(
        "welcome",
        `User ${socket.id} has joined the ${
          socket.handshake.query.roomId as string
        } room`
      );

    io.of("/chatting")
      .to(socket.handshake.query.roomId as string)
      .emit("history", history);

    socket.on("leave", (roomName: any) => {
      socket.leave(roomName);
      io.to(roomName).emit(
        "message",
        `User ${socket.id} has left the ${roomName} room`
      );
    });

    socket.on("message", async (msg: any) => {
      console.log(`Received message: ${msg}`);
      console.log(socket.handshake.query.roomId as string);
      console.log(socket.rooms);

      await chattingDao.messageData(
        msg,
        socket.handshake.query.userId as string,
        socket.handshake.query.roomId as string
      );

      io.of("/chatting")
        .to(socket.handshake.query.roomId as string)
        .emit("newMessage", msg);
    });

    socket.on("disconnecting", () => {
      console.log(`Client disconnected with id: ${socket.id}`);

      socket.rooms.forEach((room) =>
        io
          .of("/chatting")
          .to(room)
          .emit("bye", `User ${socket.id} has left the room`)
      );
    });
  });
  next();
};
