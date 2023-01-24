import myDataSource from "./myDataSource";
import { Request } from "express";

class roomDao {
  static getRoomList = async (req: Request) => {
    return await myDataSource.query(
      `SELECT
  rd.room_name,
  rd.users_count,
  rd.room_order_status_id,
  rd.map_categories_id,
  u.nickname,
  u.profile_image
  FROM
  room_description rd
  JOIN room ON room.room_description_id = rd.id
  JOIN room_users ru ON room.id = ru.room_id
  JOIN users u ON ru.users_id = u.id`
    );
  };

  static postRoom = async (
    roomName: string,
    roomCategory: number,
    userId: number
  ) => {
    const roomDescription = await myDataSource.query(
      `INSERT INTO
      room_description(
        room_name,
        map_categories_id,
        users_count,
        room_order_status_id
        )
        VALUES ($1, $2, 1, 1)`,
      [roomName, roomCategory]
    );
    const room = await myDataSource.query(
      `INSERT INTO
      room(
        room_description_id)
        VALUES(?)`,
      [roomDescription.id]
    );
    await myDataSource.query(
      `INSERT INTO
      room_users(
        users_id,
        room_id
      )
      VALUES
      (?, $3)`,
      [room.id, userId]
    );
  };
  static getRoomInfo = async (req: Request) => {
    return myDataSource.query(
      `SELECT
      u.nickname,
      u.profile_image,
      rd.room_name,
      rd.room_order_status_id
      FROM
      room_description rd
      JOIN room ON room.room_description_id = rd.id
      JOIN room_users ru ON room.id = ru.room_id
      JOIN users u ON ru.users_id = u.id`
    );
  };

  static patchOrderStatus = async (orderStatus: number, roomId: number) => {
    return myDataSource.query(
      `UPDATE 
      room_description rd
      JOIN room r ON rd.id = r.room_description_id
      SET
       room_order_status_id = $1
      WHERE
      r.id = $2
      `,
      [roomId, orderStatus]
    );
  };
  static patchRoomName = async (roomName: string, roomId: number) => {
    return (
      myDataSource.query(
        `UPDATE
      room_description rd
      JOIN room r ON rd.id = r.room_description_id
      SET
      room_name =$1
      WHERE r.id = $2`
      ),
      [roomName, roomId]
    );
  };
  static postRoomUser = async (userId: number, roomId: number) => {
    await myDataSource.query(
      `INSERT INTO
      room_users(
        users_id,
        room_id)
        VALUES
        ($1, $2)`,
      [userId, roomId]
    );
    await myDataSource.query(
      `UPDATE
      room_description rd
      JOIN room r ON rd.id = r.room_description_id
      SET users_count = users_count + 1
      WHERE r.id = $2`
    );
  };
  static deleteRoomUser = async (userId: number, roomId: number) => {
    await myDataSource.query(
      `DELETE FROM room_users
      WHERE user_id = $1 AND room_id = $2`,
      [userId, roomId]
    );
    const result = await myDataSource.query(
      `UPDATE
        room_description rd
        JOIN room r ON rd.id = r.room_description_id
        SET users_count = users_count - 1
        WHERE r.id = $2`
    );

    if (result.users_count === 0) {
      await myDataSource.query(
        `DELETE FROM room_description rd
        JOIN room r ON rd.id = r.room_description_id
        WHERE r.id = $2 AND r.id = r.room_description_id`
      );
    }
  };
  static updateCategory = async (userId: number, categoryId: number) => {
    return myDataSource.query(
      `UPDATE
      room_description rd 
      JOIN room r ON rd.id = r.room_description_id
      JOIN room_users ru ON r.id = ru.room_id
      SET map_categories_id = $2
      WHERE ru.user_id = $1`,
      [userId, categoryId]
    );
  };
}
export default roomDao;
