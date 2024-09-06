const { body, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  body("userName")
    .exists()
    .withMessage("User Name is required")
    .isLength({ min: 4 })
    .withMessage("Invalid username")
    .toLowerCase(),

  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 chars long")
    .isLength({ max: 30 })
    .withMessage("password must be at max 30 chars long"),

  body("mobile")
    .exists()
    .withMessage("Contact is required")
    .isNumeric()
    .isMobilePhone("en-IN")
    .withMessage("Contact Number is invalid")
    .isLength({ min: 10 })
    .withMessage("contact must be at least 10 digits"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ success: false, msg: errors.array()[0].msg });
    next();
  },
];

exports.validateUserLogIn = [
  body("userName")
    .exists()
    .withMessage("User Name is required")
    .isLength({ min: 4 })
    .withMessage("Invalid username")
    .toLowerCase(),

  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 chars long")
    .isLength({ max: 30 })
    .withMessage("password must be at max 30 chars long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ success: false, msg: errors.array()[0].msg });
    next();
  },
];
