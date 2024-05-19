const { Schema, model } = require("mongoose");
const { TASK_STATUS } = require("../utils");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: TASK_STATUS,
    default: TASK_STATUS.PENDING,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

exports.Task = model("Task", taskSchema);
