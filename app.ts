import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

import { errorHandler } from "./api/middlewares/error";
import router from "./api/routes/index";
import myDataSource from "./api/models/myDataSource";
import { isBooleanObject } from "util/types";

dotenv.config();

class app {
  private app: express.Application;
  private PORT: number;
  server: http.Server;
  io: any;

  constructor() {
    this.app = express();
    this.PORT = Number(process.env.PORT) || 3000;
    this.initializeMiddlewares();
    this.errorHandling();
    this.get();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(router);
  }

  private errorHandling() {
    this.app.use(errorHandler);
  }

  private get() {
    this.app.get("/ping", (request: Request, response: Response) => {
      response.status(200).send("pong");
    });
  }

  public start = async () => {
    try {
      await myDataSource
        .initialize()
        .then(() => {
          console.log("Data Source has been initialized!");
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });
      this.server.listen(this.PORT, () => {
        console.log(`server listening on ${this.PORT}`);

        this.io.on("connection", (socket: Socket) => {
          console.log(`New client connected with id: ${socket.id}`);

          socket.on("join room", (msg: any) => {
            socket.join(msg.name);
            console.log(socket.rooms);

            this.io.to(msg.name).emit("message", `User ${socket.id} has joined the ${msg.name} room`);
          });

          socket.on("leave", (msg: any) => {
            socket.leave(msg.name);
            this.io.to(msg.name).emit("message", `User ${socket.id} has left the ${msg.name} room`);
          });

          socket.on("message", async (msg: any) => {
            console.log(`Received message: ${msg}`);
            console.log(socket.rooms);

            this.io.to(msg.name).emit("newMessage", msg.message);
          });

          socket.on("disconnect", () => {
            console.log(`Client disconnected with id: ${socket.id}`);

            this.io.to("room2").emit("message", `User ${socket.id} has left the room`);
          });
        });
      });
    } catch (err) {
      myDataSource.destroy();
      console.error(err);
    }
  };
}

export default app;
