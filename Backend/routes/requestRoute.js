import express from "express";
import userAuth from "../middlewares/auth.js";
import { sendConnection } from "../controllers/requestController.js";
const requestRoute = express.Router();
requestRoute.post("/sendConnectionRequest", userAuth, sendConnection);
export default requestRoute;
