const express = require("express");
const {
  getAllCourse,
  getACourse,
  createCourse,
} = require("../controllers/course");

const userRouter = express.Router();

userRouter.get("/", getAllCourse);
userRouter.get("/:courseId", getACourse);
userRouter.post("/", createCourse);

module.exports = { userRouter };
