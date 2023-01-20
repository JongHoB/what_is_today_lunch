import { Router } from "express";
import { router as chattingRouter } from "./chattingRouter";

const router = Router();

router.use("/chatting", chattingRouter);

export default router;
