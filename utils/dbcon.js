const mongoose = require("mongoose");

const DB_PASS = encodeURIComponent(process.env.DB_PASS);
const PRE_DB_URL = process.env.PRE_DB_URL;
const POST_DB_URL = process.env.POST_DB_URL;
const encodedURI = `${PRE_DB_URL}${DB_PASS}${POST_DB_URL}`;

exports.connectToDb = async () => {
  try {
    const DB_URL =
      process.env.CURRENT_ENV && process.env.CURRENT_ENV === "Dev"
        ? process.env.DB_URL
        : encodedURI;
    await mongoose.connect(DB_URL, {});
    console.log("DB connection successful");
  } catch (err) {
    console.log(err);
    process.exit(1); // kill the process if db connection is not successful
  }
};
