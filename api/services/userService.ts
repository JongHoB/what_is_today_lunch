import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import userDao from "../models/userDao";

interface info {
  name: string;
  email: string;
  picture: string;
}
class userService {
  static googleLogin = async (code: string) => {
    const googleInfo: info = await jwt_decode(code);
    const userName = googleInfo.name;
    const userEmail = googleInfo.email;
    const userImage = googleInfo.picture;
    const userInfo = await userDao.getUserInfo(userEmail);

    if (!userInfo) {
      const newUser = await userDao.createUser(userName, userEmail, userImage);
      const payLoad = { userId: newUser.id };
      const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET!);
      return accessToken;
    }
    const payLoad = { userId: userInfo.id };
    const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET!);
    return accessToken;
  };
}

export default userService;
