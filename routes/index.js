const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require("../services/auth");
const {
  validateUserSignUp,
  validateUserLogIn,
} = require("../middlewares/validators");
const { protect } = require("../middlewares/authConfig");

router.route("/signup").post(validateUserSignUp, registerUser);
router.route("/login").post(validateUserLogIn, loginUser);
router.route("/info").post(protect, getUserInfo);

module.exports = router;
