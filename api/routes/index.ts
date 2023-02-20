import { Router } from "express";
import userRouter from "./userRouter";
import chattingRouter from "./chattingRouter";


const router = Router();

router.use("/login", userRouter);
router.use("/chatting", chattingRouter);

export default router;
