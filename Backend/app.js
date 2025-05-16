import express from "express";
import adminAuth from "./middlewares/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  res.send("Hello from the server");
});

app.get("/hello", adminAuth, (req, res) => {
  res.send("Hello from the server Admin");
});

app.get("/tes", (req, res) => {
  res.send("Test from the server");
});

// app.use("/", (req, res) => {
//   res.status(404).send("Route not found");
// });

app.listen(PORT, () => {
  console.log(`Server is Listening to the port ${PORT}`);
});
