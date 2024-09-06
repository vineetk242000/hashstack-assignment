const mongoose = require("mongoose");

const connect = async function () {
  const uri = process.env.MongoDB_uri;
  return mongoose.connect(uri);
};

async function connectToDb() {
  try {
    await connect();
    console.log("Db connected");
  } catch (e) {
    console.log("Error happend while connecting to the DB: ", e.message);
  }
}

module.export = connectToDb();
