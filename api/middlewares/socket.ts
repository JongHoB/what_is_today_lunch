import { Server, Socket } from "socket.io";
import { Request, Response, NextFunction } from "express";

const io = new Server();

export const socketIo = async (request: Request, response: Response, next: NextFunction) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected with id: ${socket.id}`);

    socket.on("join", (room: string) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    socket.on("leave", (room: string) => {
      socket.leave(room);
      console.log(`Client left room: ${room}`);
    });

    socket.on("message", (data: any) => {
      console.log(`Received message: ${data}`);
      socket.to(data.room).emit("newMessage", { message: data.message });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected with id: ${socket.id}`);
    });
  });
  next();
};
