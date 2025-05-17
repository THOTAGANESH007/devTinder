import express from "express";
import adminAuth from "./middlewares/auth.js";
import connectDB from "./config/dbConnect.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// app.get("/test", (req, res) => {
//   res.send("Hello from the server");
// });

// app.get("/hello", adminAuth, (req, res) => {
//   res.send("Hello from the server Admin");
// });

// app.get("/tes", (req, res) => {
//   res.send("Test from the server");
// });

// app.use("/", (req, res) => {
//   res.status(404).send("Route not found");
// });

// app.use(
//   "/test",
//   (req, res, next) => {
//     console.log("Middleware executed 1");
//     //res.send("Hello from the server 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Middleware executed 2");
//     //res.send("Hello from the server 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Middleware executed 3");
//     //res.send("Hello from the server 3");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Middleware executed 4");
//     res.send("Hello from the server 4");
//     next();
//   }
// );

app.use("/user", userRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Listening to the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
