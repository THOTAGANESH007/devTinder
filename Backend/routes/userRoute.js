import express from "express";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  loginUser,
  registerUser,
  updateUser,
  viewProfile,
} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/profile", userAuth, viewProfile);
userRoute.get("/getUser", getOneUser);
userRoute.get("/feed", getAllUsers);
userRoute.delete("/delete", deleteUser);
userRoute.patch("/update/:userId", updateUser);
export default userRoute;
