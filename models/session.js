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
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    default: Date.now,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Sessions = mongoose.model("Sessions", sessionsSchema);
module.exports = Sessions;
