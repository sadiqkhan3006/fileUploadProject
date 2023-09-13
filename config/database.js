const mongoose = require("mongoose");
require("dotenv").config();
exports.dbconnect = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((err) => {
      console.log(err.message);
      console.log("Error while connecting to db..");
      process.exit(1);
    });
};
