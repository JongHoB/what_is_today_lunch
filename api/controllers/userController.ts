import { Request, Response } from "express";
import userService from "../services/userService";
import { asyncErrorHandler } from "../middlewares/error";

class user {
  static googleLogin = (req: Request, res: Response) => {
    const code: any = req.headers.authorization;
    const accessToken = userService.googleLogin(code);

    res.status(200).json({ accessToken });
  };
}
export default user;
