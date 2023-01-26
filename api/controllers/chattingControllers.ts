import { Request, Response } from "express";
import chattingServices from "../services/chattingServices";
import chattingDao from "../models/chattingDao";
import { asyncErrorHandler } from "../middlewares/error";

class chattingControllers {
  static getUserInfo = asyncErrorHandler(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const { name, image } = req.body;

    const result = await chattingServices.getUserInfo(roomId, name, image);
    //const result = await chattingDao.test();
    return res.status(200).json(result);
  });
}

export default chattingControllers;
