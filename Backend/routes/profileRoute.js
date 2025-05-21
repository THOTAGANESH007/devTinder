import express from "express";
import userAuth from "../middlewares/auth.js";
import {
  editProfile,
  getFeed,
  updatePassword,
  viewProfile,
} from "../controllers/profileController.js";
const profileRoute = express.Router();
profileRoute.get("/view", userAuth, viewProfile);
profileRoute.patch("/edit", userAuth, editProfile);
profileRoute.patch("/updatePassword", userAuth, updatePassword);
profileRoute.get("/feed", userAuth, getFeed);

export default profileRoute;
