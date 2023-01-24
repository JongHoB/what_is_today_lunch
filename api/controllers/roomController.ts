import { Request, Response } from "express";
import roomService from "../services/roomService";

class roomController {
  static getRoomList = async (req: Request, res: Response) => {
    const result = await roomService.getRoomList(req);
    return res.status(200).json({ result });
  };
  static postRoom = async (req: Request, res: Response) => {
    const { roomName, roomCategory } = req.body;
    const userId = req.headers;
    await roomService.postRoom(roomName, roomCategory, userId);
    return res.status(201).json({ message: "SUCCESS_POST_ROOM" });
  };

  static getRoomInfo = async (req: Request, res: Response) => {
    const result = await roomService.getRoomInfo(req);
    return res.status(200).json({ result });
  };

  static patchOrderStatus = async (req: Request, res: Response) => {
    const { roomId, orderStatus } = req.body;
    await roomService.patchOrderStatus(orderStatus, roomId);
    return res.status(201).json({ message: "SUCCESS_PATCH_ORDER_STATUS" });
  };

  static patchRoomName = async (req: Request, res: Response) => {
    const { roomId, roomName } = req.body;
    await roomService.patchRoomName(roomName, roomId);
    return res.status(201).json({ message: "SUCCESS_PATCH_ROOM_NAME" });
  };
  static postRoomUser = async (req: Request, res: Response) => {
    const userId = req.headers;
    const roomId = req.body;
    await roomService.postRoomUser(userId, roomId);
    return res.status(201).json({ message: "SUCCESS_POST_ROOM_USER" });
  };
  static deleteRoomUser = async (req: Request, res: Response) => {
    const userId = req.headers;
    const roomId = req.body;
    await roomService.deleteRoomUser(userId, roomId);
    return res.status(201).json({ message: "SUCCES_DELETE_ROOM_USER" });
  };
  static updateCategory = async (req: Request, res: Response) => {
    const userId = req.headers;
    const categoryId = req.body;
    await roomService.updateCategory(userId, categoryId);
    return res.status(201).json({ message: "SUCCESS_UPDATE_CATEGORY" });
  };
}
export default roomController;
