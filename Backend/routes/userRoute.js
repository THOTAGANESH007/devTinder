import express from "express";
import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/logout", logoutUser);
userRoute.delete("/delete", deleteUser);
userRoute.patch("/update/:userId", updateUser);
export default userRoute;
