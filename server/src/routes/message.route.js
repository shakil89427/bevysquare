const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, messageController.getMessage);

module.exports = router;
