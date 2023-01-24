import { Router } from "express";
import { chattingControllers } from "../controllers/chattingControllers";

export const router = Router();

router.post("", chattingControllers.conversation);
