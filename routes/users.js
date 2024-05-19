const express = require("express");
const {
  getUsers,
  getAUser,
  createUser,
  login,
} = require("../controllers/user");
const { authenticate } = require("../utils");
const {
  UserCreationValidation,
  UserLoginValidation,
} = require("../validations/user");

const userRouter = express.Router();
userRouter.get("/", authenticate, getUsers);
userRouter.get("/:id", authenticate, getAUser);
userRouter.post("/", UserCreationValidation, createUser);
userRouter.post("/login", UserLoginValidation, login);

module.exports = { userRouter };
