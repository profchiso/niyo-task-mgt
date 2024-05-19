const express = require("express");
const undefinedRouter = express.Router();
const { undefinedRoute } = require("../controllers/undefinedroute");

undefinedRouter.all("*", undefinedRoute);
module.exports = { undefinedRouter };
