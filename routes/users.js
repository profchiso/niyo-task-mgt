const express = require("express");
const {
  getUsers,
  getAUser,
  createUser,
  login,
} = require("../controllers/user");
const { authenticate } = require("../utils");

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.get("/:id", authenticate, getAUser);
userRouter.post("/", createUser);
userRouter.post("/login", login);

module.exports = { userRouter };
