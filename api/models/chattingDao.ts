import myDataSource from "./myDataSource";

class chattingDao {
  static getUserInfo = async (roomId: string, name: string, image: string) => {
    const result = await myDataSource.query(
      `
      SELECT
        *
      FROM users
      `
    );
    [];
    return result;
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
