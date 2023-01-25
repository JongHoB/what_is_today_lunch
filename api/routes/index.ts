import { Router } from "express";
import chattingRouter from "./chattingRouter";

const router = Router();

router.use("/chatting", chattingRouter);

export default router;
