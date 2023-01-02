const express = require("express");
const router = express.Router();
const helpController = require("../controllers/help.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.post("/", verifyAccessToken, helpController.addHelp);

module.exports = router;
