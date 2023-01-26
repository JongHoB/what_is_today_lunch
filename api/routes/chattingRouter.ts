import { Router } from "express";
import chattingControllers from "../controllers/chattingControllers";
import { socketIo } from "../middlewares/socket";

const chattingRouter = Router();

chattingRouter.get("", socketIo, chattingControllers.getUserInfo);

export default chattingRouter;
