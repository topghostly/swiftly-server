const express = require("express");

const {
  loginController,
  registrationController,
  verifyOtp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registrationController);
router.post("/verify-otp", verifyOtp);
module.exports = router;
