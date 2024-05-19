const {
  getOne,
  getAll,
  updateDocument,
  createDocument,
  STATUS_CODES,
  RESPONSE_TEXT,
} = require("../utils");

const { User } = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    getAll(req, res, User, ["password", "__v"]);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
exports.getAUser = async (req, res) => {
  try {
    getOne(req, res, User);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    createDocument(req, res, User);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    updateDocument(req, res, User);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
