const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, notificationController.getNotification);

module.exports = router;
