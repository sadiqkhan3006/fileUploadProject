const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());
//db connect//
const { dbconnect } = require("./config/database");
dbconnect();
//cloudinary connect//
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

//api route mount //
const upload = require("./routes/fileUpload");
app.use("/api/v1/upload", upload);

//activate server
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
