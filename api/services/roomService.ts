import roomDao from "../models/roomDao";
import { Request } from "express";

class roomService {
  static getRoomList = () => {
    return roomDao.getRoomList();
  };
  static postRoom = (roomName: string, roomCategory: number, userId: any) => {
    return roomDao.postRoom(roomName, roomCategory, userId);
  };

  static getRoomInfo = () => {
    return roomDao.getRoomInfo();
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
  static updateCategory = (categoryId: number, roomId: number) => {
    return roomDao.updateCategory(categoryId, roomId);
  };
  static deleteAll = (roomId: number) => {
    return roomDao.deleteAll(roomId);
  };
}
export default roomService;
