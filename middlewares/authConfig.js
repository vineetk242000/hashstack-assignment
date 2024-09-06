const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Session = require("../models/session");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //If middleware doesn't receives any token with the request from  the frontend then return error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You need to be logged in to visit this route",
    });
  }

  try {
    // decoding the token to extract userId of the user
    const decoded = jwt.verify(token, process.env.Jwt_Secret);

    // search for the user in the user db with the decoded userId from the token
    const user = await User.findById(decoded.id)
      .select("userName mobile userLevel")
      .lean();

    if (!user) {
      // If the user is not found in the db then return  error
      return res.status(401).json({
        success: false,
        message: "",
      });
    }
    // pass the user value to the next  middleware
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Session Expired. Please Login Again",
    });
  }
};
