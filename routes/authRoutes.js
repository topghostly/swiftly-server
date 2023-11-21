const express = require("express");

const {
  loginController,
  registrationController,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registrationController);
module.exports = router;
