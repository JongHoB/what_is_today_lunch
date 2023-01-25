import { Server, Socket } from "socket.io";
import { Request, Response, NextFunction } from "express";
import createApp from "../../server";

export const socketIo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const io = new Server(await createApp.getServer());

  io.of("/chatting").on("connection", (socket: Socket) => {
    console.log(`New client connected with id: ${socket.id}`);

    socket.on("join room", (msg: any) => {
      socket.join(msg.name);
      console.log(socket.rooms);

      io.of("/chatting")
        .to(msg.name)
        .emit("message", `User ${socket.id} has joined the ${msg.name} room`);
    });

    socket.on("leave", (msg: any) => {
      socket.leave(msg.name);
      io.to(msg.name).emit(
        "message",
        `User ${socket.id} has left the ${msg.name} room`
      );
    });

    socket.on("message", async (msg: any) => {
      console.log(`Received message: ${msg}`);
      console.log(socket.rooms);

      io.of("/chatting").to(msg.name).emit("newMessage", msg.message);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected with id: ${socket.id}`);

      io.of("/chatting")
        .to("room2")
        .emit("message", `User ${socket.id} has left the room`);
    });
  });
  next();
};
