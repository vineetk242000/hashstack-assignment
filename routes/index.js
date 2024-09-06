const express = require("express");
const router = express.Router();
const { registerUser } = require("../services/auth");

router.route("/signup").post(registerUser);

module.exports = router;
