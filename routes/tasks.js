const express = require("express");
const {
  getAllTasks,
  getATask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const { authenticate } = require("../utils");

const taskRouter = express.Router();

taskRouter.get("/", authenticate, getAllTasks);
taskRouter.get("/:id", authenticate, getATask);
taskRouter.post("/", authenticate, createTask);
taskRouter.patch("/:id", authenticate, updateTask);
taskRouter.delete("/:id", authenticate, deleteTask);

module.exports = { taskRouter };
