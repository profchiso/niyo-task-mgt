const {
  getOne,
  getAll,
  createDocument,
  STATUS_CODES,
  RESPONSE_TEXT,
  hashUserPassword,
  decryptPassword,
  generateAccessToken,
  validationCheck,
} = require("../utils");

const { User } = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    getAll(
      req,
      res,
      User,
      ["password", "__v"],
      { required: false },
      "Users Fetched successfully"
    );
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
    getOne(req, res, User, ["password", "__v"]);
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
    await validationCheck(req, res); // handle validation errors

    //CHECK IF USER EXIST
    let { email } = req.body;
    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: `Email  already associated with an account` }],
      });
    }

    let hashedPassword = await hashUserPassword(req.body.password);
    req.body.password = hashedPassword;
    req.body.email = req.body.email.toLowerCase();

    let created = await createDocument(
      req,
      res,
      User,
      {},
      "User Created Successfully"
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

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    //validation
    await validationCheck(req, res);
    //CHECK IF USER EXIST
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).send({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: `Invalid user credentials` }],
      });
    }

    //COMPARE ENTERED PASSWORD WITH HASHED PASSWORD
    if (!(await decryptPassword(password, existingUser.password))) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: `Invalid user credentials` }],
      });
    }
    //JWT PAYLOAD FOR SIGNED IN USER
    const payLoad = {
      user: {
        id: existingUser.id,
      },
    };
    let accessToken = await generateAccessToken(payLoad);
    let resource = { ...existingUser._doc };
    delete resource.password;
    req.user = resource;
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: {
        msg: `Login successful`,
        resource,
        extra: { accessToken },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
