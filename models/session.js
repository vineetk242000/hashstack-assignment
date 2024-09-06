const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionsSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Sessions",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
  },
});

const Session = mongoose.model("Session", sessionsSchema);
module.exports = Session;
