import { Router } from "express";
import mapRouter from "./mapRoutes";
import userRouter from "./userRouter";

const router = Router();

router.use("/login", userRouter);
router.use("/map", mapRouter);

export default router;
