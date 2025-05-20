import UserModel from "../models/user.js";
import { validatePassword, validateProfile } from "../utils/validator.js";
import bcrypt from "bcrypt";
export const viewProfile = async (req, res) => {
  try {
    const user = req.user;
    //console.log(user);
    return res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    validateProfile(req);
    const user = req.user;
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      updates[key] = req.body[key];
    });
    const updateUser = await UserModel.findByIdAndUpdate(user._id, updates, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({
        message: "Updation failed",
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updatePassword = async (req, res) => {
  try {
    validatePassword(req);
    const user = req.user;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "Password update failed",
      });
    }
    return res.status(200).json({
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOneUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide an email",
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    return res.status(200).json({
      message: "Users found",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
