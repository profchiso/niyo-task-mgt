//NPM modules
require("dotenv").config(); //require the config files
const express = require("express");
const cors = require("cors");

//user defined modules
const { userRouter } = require("./routes/users");
const { taskRouter } = require("./routes/tasks");
const { undefinedRouter } = require("./routes/undefinedroute");

// db connection
const { connectToDb } = require("./utils");

connectToDb();

const app = express();
app.enable("trust proxy");

//middlewares
app.use(express.json({ limit: "100mb" })); //middleware for body-paser
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //middleware to allow cross origin resource sharing

//middleware to  log request details
app.use((req, res, next) => {
  let payloadSize = req.headers["content-length"];
  console.log(`[Request Payload Size: ${payloadSize}]`);
  console.log(
    `[time: "${new Date().toISOString()}"  method: "${req.method}"   url: "${
      req.originalUrl
    }"  payload: "${JSON.stringify(req.body)}"  user-agent: "${
      req.headers["user-agent"]
    }"  ip: "${req.ip}"]`
  );
  next();
});

//api routes
app.get("/api/v1", (req, res) => {
  res.json({
    statusCode: 200,
    statusText: "SUCCESS",
    data: {
      msg: `Welcome   ${req.ip} to Niyo task management API`,
      resource: {},
    },
  });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//catch undefined endpoints
app.use(undefinedRouter);

//spin up the server on the env port number
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});
