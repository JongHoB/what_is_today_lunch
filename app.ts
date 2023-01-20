import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import { errorHandler } from "./api/middlewares/error";
import router from "./api/routes/index";
import myDataSource from "./api/models/myDataSource";

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
      this.app.listen(this.PORT, () => {
        console.log(`server listening on ${this.PORT}`);
      });
    } catch (err) {
      myDataSource.destroy();
      console.error(err);
    }
  };
}

export default app;
