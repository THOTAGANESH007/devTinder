const express = require("express");
const adminAuth = require("./middlewares/auth");
const app = express();
const PORT = 7777;

//Order of the routes matter the most
app.use("/hello", adminAuth, (req, res) => {
  res.send("Hello from the server");
});

app.use("/test", (req, res) => {
  res.send("Test from the server");
});

app.use("/", (req, res) => {
  res.send("From the server");
});

app.listen(PORT, () => {
  console.log(`Server is Listening to the port ${PORT}`);
});
