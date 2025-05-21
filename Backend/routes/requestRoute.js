import express from "express";
import userAuth from "../middlewares/auth.js";
import {
  getAcceptedConnectionRequests,
  getConnectionRequests,
  reviewConnection,
  sendConnection,
} from "../controllers/requestController.js";
const requestRoute = express.Router();
requestRoute.post("/send/:status/:toUserId", userAuth, sendConnection);
requestRoute.post("/review/:status/:requestId", userAuth, reviewConnection);
requestRoute.get("/received", userAuth, getConnectionRequests);
requestRoute.get("/accepted", userAuth, getAcceptedConnectionRequests);
export default requestRoute;
