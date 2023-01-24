import { Request, Response } from "express";
import { chattingServices } from "../services/chattingServices";
import { asyncErrorHandler } from "../middlewares/error";

export const chattingControllers = {
  conversation: asyncErrorHandler(async (req: Request, res: Response) => {
    const message = await chattingServices.conversation(req.body);
    return res.json({ message });
  }),
};
