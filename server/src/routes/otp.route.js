const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otp.controller");

router.get("/", otpController.sendOtp);
router.post("/", otpController.verifyOtp);

module.exports = router;
