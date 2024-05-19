const { body } = require("express-validator");

exports.UserCreationValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Not a valid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

exports.UserLoginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Not a valid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
