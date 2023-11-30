const nodemailer = require("nodemailer");
const fs = require("fs");
const Otp = require("../models/otpModels");

const generateOTP = async (userMail) => {
  try {
    const existingOTP = await Otp.findOne({ usermail: userMail });
    if (existingOTP) {
      await Otp.findOneAndDelete({ usermail: userMail });
    }
  } catch (error) {
    console.log("Error verifying OTP", error);
  }
  const OTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Otp is", OTP);
  try {
    const otpResponse = await Otp.create({
      usermail: userMail,
      otp: OTP,
    });

    if (!otpResponse) {
      console.error("Error generating OTP");
      return null;
    }

    return OTP;
  } catch (error) {
    console.error("Error generating OTP:", error);
    return null;
  }
};

const generateExpTime = () => {
  try {
    const currentTime = new Date();
    const expTime = new Date(currentTime.getTime() + 4 * 60000);

    const hr = String(expTime.getHours()).padStart(2, "0");
    const mint = String(expTime.getMinutes()).padStart(2, "0");

    const formattedExpTime = `${hr}:${mint}`;

    return formattedExpTime;
  } catch (error) {
    console.log(error);
    return "5 minutes";
  }
};
const sendOTP = async (userMail) => {
  console.log("This has started", userMail);

  const OTP = await generateOTP(userMail);
  const expTime = generateExpTime();

  if (!OTP) {
    console.log("Wn error occured while generating the OTP");
    return mul;
  }

  const mailConfig = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: "temitopeabolaji0327@gmail.com",
      pass: process.env.ELASTIC_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "temitopeabolaji0327@gmail.com",
    to: userMail,
    subject: "Swifty One-Time Password Authentication Request",
    html: `
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
      .container {
        margin: 0px auto;
        border: solid 1px rgb(236, 236, 236);
        display: grid;
        place-content: center;
        text-align: center;
        padding: 20px;
        border-radius: 10px;
        width: fit-content;
        line-height: 15px;
      }
      img {
        display: grid;
        place-content: center;
        margin: 20px auto;
        width: 45px;
      }
      h1 {
        color: #330ba6;
      }
      </style>
    </head>
    <body>
      <img src="https://i.ibb.co/6wZv4s4/logo.png" alt="logo">
      <div class="container">
        <p>Hey,</p>
        <p>Please use the verification code below to log into Swifty.</p>
        <br/>
        <h1>${OTP}</h1>
        <br/>
        <p>If you didn't request this, you can ignore it or let us know</p>
        <small>This OTP would expire at ${expTime} UTC</small>
      </div>
    </body>
  </html>
    `,
  };

  mailConfig.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

module.exports = sendOTP;
