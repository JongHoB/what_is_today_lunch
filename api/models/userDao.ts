import myDataSource from "./myDataSource";

class userDao {
  static createUser = async (
    userName: string,
    userEmail: string,
    userImage: string
  ) => {
    return myDataSource.query(
      `INSERT INTO users u(
      u.name,
      u.email,
      u.profile_image)
      VALUES
      (?, ?, ?)`,
      [userName, userEmail, userImage]
    );
  };

  static getUserInfo = async (userEmail: string) => {
    return myDataSource.query(
      `SELECT 
      u.id,
    u.email
    FROM 
    users u
    WHERE u.email = '?'`,
      [userEmail]
    );
  };
}

export default userDao;
