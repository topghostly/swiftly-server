const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Otp = require("../models/otpModels");
const handleOtp = require("../utlls/handleOTP");

const loginController = async (req, res) => {
  const loginInfo = req.body ? req.body : null;

  if (!loginInfo) {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(400).json({
      status: "failed",
      error: "INVALID_LOGIN_DETAILS",
      message: " Recheck the login details ",
    });
  }
  try {
    const { loginMail, loginPassword } = loginInfo;
    const user = await User.findOne({ usermail: loginMail });

    if (user) {
      bcrypt.compare(loginPassword, user.password, async (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          try {
            await handleOtp(user.usermail);

            res.setHeader("Content-Type", "application/json");
            res.set("Cache-Control", "no-cache");

            return res.status(200).json({
              status: "success",
              message: " Login successful ",
              data: user,
            });
          } catch (error) {
            res.setHeader("Content-Type", "application/json");
            res.set("Cache-Control", "no-cache");

            return res.status(200).json({
              status: "failed",
              error: "LOGIN_ERROR",
              message: " An error occured while logging in ",
            });
          }
        } else {
          res.setHeader("Content-Type", "application/json");
          res.set("Cache-Control", "no-cache");

          return res.status(200).json({
            status: "failed",
            error: "INVALID_PASSWORD",
            message: " Password does not match ",
          });
        }
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.set("Cache-Control", "no-cache");

      return res.status(200).json({
        status: "failed",
        error: "INVALID_USER",
        message: " User does not exist ",
      });
    }
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(500).json({
      status: "failed",
      error: "INTERNAL_SERVER_ERROR",
      message: " An unexpected problem was encountered on the server ",
    });
  }
};

const registrationController = async (req, res) => {
  const registrationInfo = req.body ? req.body : null;

  if (!registrationInfo) {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(400).json({
      status: "failed",
      error: "INVALID_REGISTRATION_DETAILS",
      message: " Recheck the registration details ",
    });
  }
  try {
    const { username, password, usermail, businessName } = registrationInfo;

    const existingUsermail = await User.findOne({ usermail });

    if (existingUsermail) {
      console.log("The exising user is", existingUsermail);
      res.setHeader("Content-Type", "application/json");
      res.set("Cache-Control", "no-cache");

      return res.status(500).json({
        status: "failed",
        error: "USER_ALREADY_EXIST",
        message: " Input a different mail address ",
      });
    }

    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      const responce = await User.create({
        username,
        usermail,
        password: hashedPassword,
        businessName,
      });
      res.setHeader("Content-Type", "application/json");
      res.set("Cache-Control", "no-cache");

      return res.status(200).json({
        status: "success",
        message: " Registration successful ",
        data: responce,
      });
    });
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(500).json({
      status: "failed",
      error: "INTERNAL_SERVER_ERROR",
      message: " An unexpected problem was encountered on the server ",
    });
  }
};

const verifyOtp = async (req, res) => {
  const { usermail, otp } = req.query;
  try {
    const verifiedOtp = await Otp.findOne({ usermail });

    if (!verifiedOtp) {
      res.setHeader("Content-Type", "application/json");
      res.set("Cache-Control", "no-cache");

      return res.status(500).json({
        status: "failed",
        error: "INVALID_OTP_KEY",
        message: " Expired otp key ",
      });
    }

    const verifiedOtpKey = verifiedOtp.otp;

    if (verifiedOtpKey === otp) {
      try {
        const userDetails = await User.findOne({ usermail });
        // Generate session token for user
        const sessionToken = jwt.sign(
          { name: userDetails },
          process.env.JWT_ENCRYPTION_PHRASE,
          { expiresIn: "1hr" }
        );

        res.setHeader("Content-Type", "application/json");
        res.set("Cache-Control", "no-cache");

        return res.status(200).json({
          status: "success",
          message: " Login successful ",
          sessionToken,
          data: userDetails,
        });
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.set("Cache-Control", "no-cache");

        return res.status(500).json({
          status: "failed",
          error: "LOGIN_ERROR",
          message: " An error occured while logging in ",
        });
      }
    } else {
      res.setHeader("Content-Type", "application/json");
      res.set("Cache-Control", "no-cache");

      return res.status(500).json({
        status: "failed",
        error: "INVALID_OTP_KEY",
        message: " Invalid otp key ",
      });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(500).json({
      status: "failed",
      error: "INTERNAL_SERVER_ERROR",
      message: " An unexpected problem was encountered on the server ",
    });
  }
};

module.exports = { loginController, registrationController, verifyOtp };
