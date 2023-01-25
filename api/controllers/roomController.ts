import { Request, Response } from "express";
import roomService from "../services/roomService";
import { asyncErrorHandler } from "../middlewares/error";

class roomController {
  static getRoomList = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const result = await roomService.getRoomList();
      return res.status(200).json({ data: result });
    }
  );
  static postRoom = asyncErrorHandler(async (req: Request, res: Response) => {
    const { roomName, roomCategory, userId } = req.body;
    await roomService.postRoom(roomName, roomCategory, userId);
    return res.status(201).json({ message: "SUCCESS_POST_ROOM" });
  });

  static getRoomInfo = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const result = await roomService.getRoomInfo();
      return res.status(200).json({ result });
    }
  );

  static updateOrderStatus = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { roomId, orderStatus } = req.body;
      await roomService.updateOrderStatus(orderStatus, roomId);
      return res.status(200).json({ message: "SUCCESS_PATCH_ORDER_STATUS" });
    }
  );

  static updateRoomName = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { roomId, roomName } = req.body;
      await roomService.updateRoomName(roomName, roomId);
      return res.status(200).json({ message: "SUCCESS_PATCH_ROOM_NAME" });
    }
  );
  static postRoomUser = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { userId, roomId } = req.body;
      await roomService.postRoomUser(userId, roomId);
      return res.status(201).json({ message: "SUCCESS_POST_ROOM_USER" });
    }
  );
  static deleteRoomUser = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { userId, roomId } = req.body;
      await roomService.deleteRoomUser(userId, roomId);
      return res.status(200).json({ message: "SUCCES_DELETE_ROOM_USER" });
    }
  );
  static updateCategory = asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { categoryId, roomId } = req.body;
      await roomService.updateCategory(categoryId, roomId);
      return res.status(200).json({ message: "SUCCESS_UPDATE_CATEGORY" });
    }
  );
  static deleteAll = asyncErrorHandler(async (req: Request, res: Response) => {
    const { roomId } = req.body;
    await roomService.deleteAll(roomId);
    return res.status(200).json({ message: "SUCCESS_DELETE_ALL" });
  });
}
export default roomController;
