const jwt = require("jsonwebtoken");

exports.createAuthToken = async (payload) => {
  const token = await jwt.sign(payload, `${process.env.Jwt_Secret}`, {
    expiresIn: "7d",
  });
  return token;
};
