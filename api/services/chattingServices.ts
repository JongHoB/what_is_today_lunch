import chattingDao from "../models/chattingDao";

class chattingServices {
  static getUserInfo = async (roomId: string, name: string, image: string) => {
    return await chattingDao.getUserInfo(roomId, name, image);
  };
}

export default chattingServices;
