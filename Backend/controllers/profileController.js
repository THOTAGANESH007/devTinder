import ConnectionRequestModel from "../models/connectionRequest.js";
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

export const getFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 100 ? 100 : limit; // Limit the maximum number of results to 100
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select({
      fromUserId: 1,
      toUserId: 1,
    });

    const hideConnectionRequests = new Set();
    connectionRequests.forEach((request) => {
      if (request.fromUserId.toString() === loggedInUser._id.toString()) {
        hideConnectionRequests.add(request.toUserId.toString());
      } else {
        hideConnectionRequests.add(request.fromUserId.toString());
      }
    });
    const users = await UserModel.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(hideConnectionRequests) } },
      ],
    })
      .select("firstName lastName skills photoUrl age gender about")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: "Feed fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
// const user = req.user;
