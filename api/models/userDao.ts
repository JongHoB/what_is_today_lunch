import myDataSource from "./myDataSource";

class userDao {
  static createUser = async (
    userName: string,
    userEmail: string,
    userImage: string
  ) => {
    await myDataSource.query(
      `INSERT INTO users(
      name,
      email,
      profile_image)
      VALUES
      ($1, $2, $3)`,
      [userName, userEmail, userImage]
    );
    return await myDataSource.query(
      `SELECT
      id,
      name,
      email
      FROM users
      WHERE users.email = $1;`,
      [userEmail]
    );
  };

  static getUserInfo = async (userEmail: string) => {
    return myDataSource.query(
      `SELECT 
      u.id,
    u.email,
    u.profile_image
    FROM 
    users u
    WHERE u.email = $1`,
      [userEmail]
    );
  };
  static updateUserProfileImage = async (
    userEmail: string,
    userImage: string
  ) => {
    return myDataSource.query(
      `UPDATE users SET
  profile_image = $2
  WHERE email = $1`,
      [userEmail, userImage]
    );
  };
}

export default userDao;
