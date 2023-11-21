const express = require("express");

const router = express.Router();

const { indexFunction } = require("../controllers/mainControllers");

router.get("/", indexFunction);

module.exports = router;
