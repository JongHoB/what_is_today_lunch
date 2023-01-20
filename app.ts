import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import { errorHandler } from "./api/middlewares/error";

dotenv.config();

class app {
  private app: express.Application;
  private PORT: number;

  constructor() {
    this.app = express();
    this.PORT = Number(process.env.PORT) || 3000;
    this.initializeMiddlewares();
    this.errorHandling();
    this.get();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("combined"));
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
      this.app.listen(this.PORT, () => {
        console.log(`server listening on ${this.PORT}`);
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export default app;
