import { chattingDao } from "../models/chattingDao";

export const chattingServices = {
  conversation: async (data: string) => {
    return await chattingDao.conversation(data);
  },
};
