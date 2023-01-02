const express = require("express");
const router = express.Router();
const recentChatController = require("../controllers/recentChat.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, recentChatController.getChat);
router.patch("/", verifyAccessToken, recentChatController.resetCount);

module.exports = router;
