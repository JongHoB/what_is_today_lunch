import { Router } from "express";
import user from "../controllers/userController";

export const router = Router();

router.post("", user.googleLogin);
