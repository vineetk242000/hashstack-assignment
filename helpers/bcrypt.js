const bcrypt = require("bcryptjs");
exports.encodePassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

exports.decodePassword = async (password, savedPassword) => {
  const isMatch = await bcrypt.compare(password, savedPassword);
  return isMatch;
};
