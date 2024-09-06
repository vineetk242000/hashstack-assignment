const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  mobile: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userLevel: {
    type: String,
    required: true,
  },
  userSessions: [
    {
      _id: false,
      sessionId: {
        type: mongoose.Schema.ObjectId,
        ref: "Sessions",
      },
    },
  ],
});

const User = mongoose.model("User", usersSchema);
module.exports = User;
