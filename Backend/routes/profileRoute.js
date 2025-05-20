import express from "express";
import userAuth from "../middlewares/auth.js";
import {
  editProfile,
  getAllUsers,
  getOneUser,
  updatePassword,
  viewProfile,
} from "../controllers/profileController.js";
const profileRoute = express.Router();
profileRoute.get("/view", userAuth, viewProfile);
profileRoute.patch("/edit", userAuth, editProfile);
profileRoute.patch("/updatePassword", userAuth, updatePassword);
profileRoute.get("/getUser", getOneUser);
profileRoute.get("/feed", getAllUsers);

export default profileRoute;
