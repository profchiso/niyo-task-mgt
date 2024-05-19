const express = require("express");
const {
  getUsers,
  getAUser,
  createUser,
  login,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getAUser);
userRouter.post("/", createUser);
userRouter.post("/login", login);

module.exports = { userRouter };
