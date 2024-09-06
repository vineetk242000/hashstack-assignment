const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { encodePassword, decodePassword } = require("../helpers/bcrypt");
const { createAuthToken } = require("../helpers/token");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { userName, mobile, password, userLevel } = req.body;

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
  const client = await newUser.save();

  //generating auth token with jwt
  const payload = {
    id: client._id,
  };
  const token = await createAuthToken(payload);
  res.status(200).json({
    success: true,
    token: token,
  });
});
