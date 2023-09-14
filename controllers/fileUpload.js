const file = require("../models/file");
const cloudinary = require("cloudinary").v2;
const File = require("../models/file");
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
async function uploadToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    //data fetch//
    const { name, tags, email } = req.body;
    console.log(req.body);
    const file = req.files.imageFile; //image file is name of our image
    console.log("image dekhlo: ", file);
    //validations //
    const supportedTypes = ["jpeg", "jpg", "png"];
    let arr = file.name.split(".");
    const fileType = arr[arr.length - 1].toLowerCase();
    console.log(fileType);
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    //file format supported hai toh cludinary pe upload karde
    const response = await uploadToCloudinary(file, "codehelp");
    console.log("Clodinary response: ", response);
    //save entry in db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      Url: response.secure_url,
      message: "Image uploaded Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error while upploading the image to cloudinary",
    });
  }
};
