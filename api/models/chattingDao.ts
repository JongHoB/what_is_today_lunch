import myDataSource from "./myDataSource";

class chattingDao {
  static messageHistory = async (roomId: string) => {
    return myDataSource.query(
      `SELECT
       user_id,
       room_id,
       message
       FROM chatting
       WHERE room_id=$1;`,
      [roomId]
    );
  };
  static messageData = async (msg: string, userId: string, roomId: string) => {
    return myDataSource.query(
      `
      INSERT INTO chatting
        (user_id,room_id,message)
      VALUES
      ($1,$2,$3)
      `,
      [userId, roomId, msg]
    );
  };
}

export default chattingDao;
