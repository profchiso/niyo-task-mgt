const express = require("express");
const {
  getAllCourse,
  getACourse,
  createCourse,
} = require("../controllers/course");

const taskRouter = express.Router();

taskRouter.get("/", getAllCourse);
taskRouter.get("/:courseId", getACourse);
taskRouter.post("/", createCourse);

module.exports = { taskRouter };
