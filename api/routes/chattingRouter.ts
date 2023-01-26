import { Router } from "express";
import { socketIo } from "../middlewares/socket";

const chattingRouter = Router();

chattingRouter.get("", socketIo);

export default chattingRouter;
