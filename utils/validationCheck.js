const { validationResult } = require("express-validator");
const { STATUS_CODES, RESPONSE_TEXT } = require("./response");

exports.validationCheck = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: errors.array(),
    });
  }
};
