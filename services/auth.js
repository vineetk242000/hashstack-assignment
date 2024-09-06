const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { encodePassword, decodePassword } = require("../helpers/bcrypt");
const { createAuthToken } = require("../helpers/token");
const Session = require("../models/session");

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
    userName: userName,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  // db query to check for the user
  const user = await User.findOne({
    userName: userName,
  })
    .select("userName password _id")
    .lean();
  if (!user) {
    // if no user found with the given email Id
    return next({ status: 404, msg: "User does not exist" });
  }
  // Compare user input password with the password saved in database
  const isMatch = await decodePassword(password, user.password);
  if (!isMatch) return next({ status: 401, msg: "Password Incorrect" });

  const activeSession = await Session.findOne({
    userId: user._id,
    isActive: true,
  });

  //check if request ip is same as the active session
  if (
    req.ip !== activeSession.ipAddress ||
    req.headers["user-agent"] !== activeSession.userAgent
  )
    return next({
      status: 403,
      msg: "Session already active. Please logout and login again",
    });

  const payload = {
    id: user._id,
  };

  //create jwt token
  const token = await createAuthToken(payload);

  //deactivating previous session
  await Session.findOneAndUpdate(
    { _id: activeSession._id },
    { isActive: false }
  );

  //creating new session for user
  const newSession = new Session({
    userId: user._id,
    isActive: true,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    accessToken: token,
  });

  newSession.save();

  // successful request
  res.status(200).json({
    success: true,
    token: token,
    userName: user.userName,
  });
});

exports.getUserInfo = asyncHandler(async (req, res, next) => {
  const { mobile } = req.body;
  const user = req.user;

  //check user level of request. If super admin then allow
  if (user.userLevel !== "super_admin")
    return next({
      status: 403,
      msg: "You don't have the access to get user session info",
    });

  // find customer with contact number
  const customer = await User.findOne({ mobile })
    .select("userName mobile _id")
    .lean();
  const sessions = await Session.find({ userId: customer._id }).select(
    "_id ipAddress userAgent isActive startTime"
  );
  customer.sessions = sessions;

  res.status(200).json({ success: true, customer });
});
