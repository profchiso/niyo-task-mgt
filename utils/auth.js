const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { STATUS_CODES, RESPONSE_TEXT } = require("./response");
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = async (req, res, next) => {
  try {
    let accessToken;
    //check if token was sent along with the request and also that the user used the right authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    //check if the access token actually exist
    if (!accessToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        statusCode: STATUS_CODES.UNAUTHORIZED,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Access denied, no token passed" }],
      });
    }
    //decode the access token
    const decodedToken = await jwt.verify(accessToken, JWT_SECRET);

    //check if user exist   just to be sure the user had not bern deleted
    const user = await User.findById(decodedToken.user.id).select(
      "-password -passwordResetCode "
    );
    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        statusCode: STATUS_CODES.UNAUTHORIZED,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [
          {
            msg: "Access denied, user with the token might have been deleted or deactivated",
          },
        ],
      });
    }
    //Allow access to protected route
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.message.includes("jwt expired")) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        statusCode: STATUS_CODES.UNAUTHORIZED,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Access token expired" }],
      });
    }
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: "Invalid accessToken" }],
    });
  }
};

//only for rendered pages
exports.isLoggedIn = async (req, res, next) => {
  let accessToken;

  if (req.cookies.accessToken) {
    try {
      accessToken = req.cookies.accessToken;

      //decode the access token
      const decodedToken = await jwt.verify(accessToken, JWT_SECRET);

      //check if user exist   just to be sure the user had not bern deleted
      const user = await User.findById(decodedToken.user.id);
      if (!user) {
        return next();
      }
      //sender a variable to the rendered template
      res.locals.user = user;
      req.user = user;

      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.authorize = (userType) => {
  return (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return res.status(STATUS_CODES.FOBIDDEN).json({
        statusCode: STATUS_CODES.FORBIDDEN,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [
          { msg: "Sorry you are forbidden to carry out this operation" },
        ],
      });
    }
    next();
  };
};
