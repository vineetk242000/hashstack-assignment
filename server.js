require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./utility/connect");

connectToDb;
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Server is running");
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    msg: `Can't find the requested url on the server!`,
  });
});
