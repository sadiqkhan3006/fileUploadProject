const file = require("../models/file");
//local file upload ///

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file //
    const file = req.files.file;
    console.log("File dekhlo guys: ", file);
    let pathArray = file.name.split(".");
    let path =
      __dirname +
      "/files/" +
      Date.now() +
      `.${pathArray[pathArray.length - 1]}`;
    console.log("Path dekhlo : ", path);
    file.mv(path, (err) => {
      //console.log(err.message);
      if (err) {
        console.log("error while moving the file");
        return res.status(500).json({ error: "File move failed" });
      } else {
        console.log("File moved sucessfully");
      }
    });
    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error while upploading the file",
    });
  }
};
