import express from "express";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  registerUser,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.get("/getUser", getOneUser);
userRoute.get("/feed", getAllUsers);
userRoute.delete("/delete", deleteUser);
export default userRoute;
