import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmilToVerify(email, newOtp) {

  const htmlContent = `<div>
  <p>Hello!</P>
  <p>Here is your single use login code for Add Socialproof:</p>
  <p>Here is Your Otp : ${newOtp}</p>
  <p>This code is valid for the next 15 minutes.</p>
  <p>If you did not request a login code from Add Socialproof, please ignore this email.</p>
  </div>`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });
  // rmdm@ruggedmonitoring.com

  var mailOptions = {
    from: "Add Socialproof", // sender address
    to: `${email}`, // list of receivers
    subject: "Verify Your Email", // Subject line
    // text:"hello"
    html: htmlContent, // html body
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });

  transporter.close();
}
