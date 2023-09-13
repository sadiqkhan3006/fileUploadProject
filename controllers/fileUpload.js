const file = require("../models/file");
//local file upload ///

exports.localFileUplaod = async (req, res) => {
  try {
    //fetch file //
    const file = req.files.file;
    console.log("File dekhlo guys: ", file);
    let path = __dirname + "/files" + Date.now();
    console.log("Path dekhlo : ", path);
    file.mv(path, (err) => {
      console.log(err.message);
      console.log("error while moving the file");
    });
    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
