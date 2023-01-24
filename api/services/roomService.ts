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
  static updateOrderStatus = (orderStatus: number, roomId: number) => {
    return roomDao.updateOrderStatus(orderStatus, roomId);
  };
  static updateRoomName = (roomName: string, roomId: number) => {
    return roomDao.updateRoomName(roomName, roomId);
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
