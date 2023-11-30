const express = require("express");

const {
  loginController,
  registrationController,
  getOtp,
  verifyOtp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registrationController);
router.post("/get-otp", getOtp);
router.post(" ", verifyOtp);

module.exports = router;
