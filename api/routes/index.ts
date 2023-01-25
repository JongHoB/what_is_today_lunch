import { Router } from "express";
import mapRouter from "./mapRoutes";

const router = Router();

router.use("/map", mapRouter);
export default router;
