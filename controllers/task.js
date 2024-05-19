const {
  getOne,
  getAll,
  updateDocument,
  deleteDocument,
  createDocument,
  STATUS_CODES,
  RESPONSE_TEXT,
  validationCheck,
} = require("../utils");

const { Task } = require("../models/task");

exports.getAllTasks = async (req, res) => {
  try {
    getAll(req, res, Task);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: STATUS_CODES.SERVER_ERROR,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
exports.getATask = async (req, res) => {
  try {
    getOne(req, res, Task);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: STATUS_CODES.SERVER_ERROR,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    await validationCheck(req, res);
    req.body.user = req.user.id;
    const created = await createDocument(
      req,
      res,
      Task,
      {},
      "Task created successfully"
    );
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: created,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await updateDocument(req, res, Task);
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: {
        msg: `Task updated successfully`,
        resource: updatedTask,
        extra: {},
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    deleteDocument(req, res, Task, "Task deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
