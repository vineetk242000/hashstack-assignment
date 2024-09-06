const mongoose = require("mongoose");

const connect = async function () {
  const uri = process.env.MongoDB_uri;
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
  });
};

async function connectToDb() {
  try {
    const connected = await connect();
    console.log("Db connected");
  } catch (e) {
    console.log("Error happend while connecting to the DB: ", e.message);
  }
}

module.export = connectToDb();
