const { body } = require("express-validator");

exports.TaskCreationValidation = [
  body("title").trim().notEmpty().withMessage("Task title is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Task description is required"),
];
