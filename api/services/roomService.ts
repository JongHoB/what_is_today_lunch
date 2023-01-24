import roomDao from "../models/roomDao";
import { Request } from "express";

class roomService {
  static getRoomList = (req: Request) => {
    return roomDao.getRoomList(req);
  };
  static postRoom = (roomName: string, roomCategory: number, userId: any) => {
    return roomDao.postRoom(roomName, roomCategory, userId);
  };

  static getRoomInfo = (req: Request) => {
    return roomDao.getRoomInfo(req);
  };
  static patchOrderStatus = (orderStatus: number, roomId: number) => {
    return roomDao.patchOrderStatus(orderStatus, roomId);
  };
  static patchRoomName = (roomName: string, roomId: number) => {
    return roomDao.patchRoomName(roomName, roomId);
  };
  static postRoomUser = (userId: any, roomId: number) => {
    return roomDao.postRoomUser(userId, roomId);
  };
  static deleteRoomUser = (userId: any, roomId: number) => {
    return roomDao.deleteRoomUser(userId, roomId);
  };
  static updateCategory = (userId: any, categoryId: number) => {
    return roomDao.updateCategory(userId, categoryId);
  };
}
export default roomService;
