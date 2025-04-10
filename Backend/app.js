const express = require("express");
const app = express();
const PORT = 7777;
app.get("/", (req, res) => {
  res.send("From the server");
});

app.get("/hello", (req, res) => {
  res.send("Hello from the server");
});

app.get("/test", (req, res) => {
  res.send("Test from the server");
});

app.listen(PORT, () => {
  console.log(`Server is Listening to the port ${PORT}`);
});
