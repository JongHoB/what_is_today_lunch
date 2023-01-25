import { Router } from "express";
import user from "../controllers/userController";

const userRouter = Router();

userRouter.post("", user.googleLogin);

export default userRouter;
