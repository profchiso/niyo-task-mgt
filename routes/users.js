const express = require("express");
const { getUser, getAUser, createUser, login } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/:id", getAUser);
userRouter.post("/", createUser);
userRouter.post("/login", login);

module.exports = { userRouter };
