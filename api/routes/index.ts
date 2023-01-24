import { Router } from "express";
import roomRouter from "./roomRouter";

const router = Router();

router.use("/rooms", roomRouter);
export default router;
