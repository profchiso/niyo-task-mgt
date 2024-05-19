const express = require("express");
const {
  getAllTasks,
  getATask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getATask);
taskRouter.post("/", createTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

module.exports = { taskRouter };
