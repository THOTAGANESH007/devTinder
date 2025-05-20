import UserModel from "../models/user.js";
import { validateSignUp } from "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const sendConnection = async (req, res) => {
  const user = req.user;
  //console.log("Sending connection request");
  res.status(200).json({
    message: "Connection request sent",
    data: user,
  });
};
