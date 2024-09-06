require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./utility/connect");
const userRoutes = require("./routes/index");

app.use(cors());
app.use(express.json());

connectToDb;
app.use("/user", userRoutes);

app.get("/", async (req, res) => {
  res.send("Server is running");
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    msg: `Can't find the requested url on the server!`,
  });
});

app.listen(process.env.http_port, () => {
  console.log("Server is running");
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ success: false, msg: err.msg });
  } else {
    console.log(err);
    res.status(500).send({ success: false, msg: "Something went wrong" });
  }
});
