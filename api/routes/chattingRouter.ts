import { Router } from "express";
import { ChattingControllers } from "../controllers/chattingControllers";

export const router = Router();

router.post("", ChattingControllers.conversation);
