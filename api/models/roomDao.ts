import myDataSource from "./myDataSource";

class roomDao {
  static getRoomList = async () => {
    return await myDataSource.query(
      `SELECT
  room.name,
  room.id,
  COUNT(ru.room_id),
  rd.room_order_status_id,
  rd.map_category_id,
  json_agg(
    json_build_object('userName', u.name,'userProfile', u.profile_image)
  ) as user
  FROM
  room_description rd
  JOIN room ON rd.room_id = room.id
  JOIN room_users ru ON room.id = ru.room_id
  JOIN users u ON ru.user_id = u.id
  GROUP BY room.name,room.id,rd.room_order_status_id,rd.map_category_id;`
    );
  };

  static postRoom = async (
    roomName: string,
    roomCategory: number,
    userId: number
  ) => {
    const [room] = await myDataSource.query(
      `INSERT INTO
      room(
        name)
        VALUES($1)
        RETURNING id 
      `,
      [roomName]
    );
    await myDataSource.query(
      `INSERT INTO
      room_users(
        user_id,
        room_id
      )
      VALUES
      ($2, $1)`,
      [room.id, userId]
    );
    await myDataSource.query(
      `INSERT INTO
      room_description(
        map_category_id,
        room_order_status_id,
        room_id
        )
        VALUES ($1, 1, $2)`,
      [roomCategory, room.id]
    );
  };
  static getRoomInfo = async () => {
    return myDataSource.query(
      `SELECT
      room.id,
      json_agg(
        json_build_object(
      'userName', users.name,
      'userProfile', users.profile_image,
      'roomName', room.name,
      'orderStatus', rd.room_order_status_id)) as data
      FROM
      room_description rd
      JOIN room ON room.id = rd.room_id
      JOIN room_users ru ON room.id = ru.room_id
      JOIN users ON ru.user_id = users.id
GROUP BY room.id`
    );
  };

  static updateOrderStatus = async (orderStatus: number, roomId: number) => {
    return myDataSource.query(
      `UPDATE 
      room_description rd
      SET
       room_order_status_id = $2
       FROM room
      WHERE
      room.id = rd.room_id
      AND
      room.id = $1
      `,
      [roomId, orderStatus]
    );
  };
  static updateRoomName = async (roomName: string, roomId: number) => {
    return myDataSource.query(
      `UPDATE
      room
      SET
      name =$1
      WHERE id = $2`,
      [roomName, roomId]
    );
  };
  static postRoomUser = async (userId: number, roomId: number) => {
    return await myDataSource.query(
      `INSERT INTO
      room_users(
        user_id,
        room_id)
        VALUES
        ($1, $2)`,
      [userId, roomId]
    );
  };
  static deleteRoomUser = async (userId: number, roomId: number) => {
    await myDataSource.query(
      `DELETE FROM room_users
      WHERE user_id = $1 AND room_id = $2`,
      [userId, roomId]
    );
  };
  static updateCategory = async (categoryId: number, roomId: number) => {
    return myDataSource.query(
      `UPDATE
      room_description rd 
      SET map_category_id = $2
      WHERE room_id = $1`,
      [roomId, categoryId]
    );
  };
  static deleteAll = async (roomId: number) => {
    await myDataSource.query(
      `DELETE FROM room_description WHERE room_id = $1`,
      [roomId]
    );
    await myDataSource.query(`DELETE FROM room_users WHERE room_id = $1`, [
      roomId,
    ]);
    await myDataSource.query(`DELETE FROM room WHERE id = $1`, [roomId]);
  };
}
export default roomDao;
