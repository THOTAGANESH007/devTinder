import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  //console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized token",
    });
  }
  try {
    const decodedCookie = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decodedCookie.userId);
    //console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};

export default userAuth;
