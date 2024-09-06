const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { encodePassword, decodePassword } = require("../helpers/bcrypt");
const { createAuthToken } = require("../helpers/token");
const Session = require("../models/session");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { userName, mobile, password, userLevel } = req.body;
  console.log(req.ip, req.headers["user-agent"]);

  //db query to check if the user already exists
  const user = await User.findOne({
    userName: userName,
  })
    .select("userName _id")
    .lean();

  if (user) {
    return next({ status: 401, msg: "Username is already Registered" });
  }
  const newUser = new User({
    userName,
    userLevel,
    mobile,
    password,
  });

  //password encryption by bcrypt
  newUser.password = await encodePassword(newUser.password);

  // saving the user to the db
  const createdUser = await newUser.save();

  //generating auth token with jwt
  const payload = {
    id: createdUser._id,
  };
  const token = await createAuthToken(payload);

  //creating new session for user
  const session = new Session({
    userId: createdUser._id,
    isActive: true,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    accessToken: token,
  });

  await session.save();

  res.status(200).json({
    success: true,
    token: token,
  });
});
