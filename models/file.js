const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});
//post middleware//
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC: ", doc);
    //transporter
    console.log(
      process.env.MAIL_HOST,
      process.env.MAIL_USER,
      process.env.MAIL_PASS
    );
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      //read foresenic book of networking usmei smtp ka article hai
      //aws ki SQS and SNS service padhlena
    });
    //send mail
    let info = await transporter.sendMail({
      from: `Codehelp- by sadiq `,
      to: doc.email,
      subject: "New file uploaded to cloudinary",
      html: `<h2>Hello ji</h2><p>File uploaded </p>`,
    });
    console.log("info: ", info);
  } catch (error) {
    console.log(error.message);
  }
});
const file = mongoose.model("File", fileSchema);
module.exports = file;
