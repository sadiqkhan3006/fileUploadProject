const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//db connect//
const { dbconnect } = require("./config/database");
dbconnect();
//cloudinary connect//
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

//api route mount //
const { router } = require("./routes/fileUpload");
app.use("/api/v1/upload", router);

//activate server
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
