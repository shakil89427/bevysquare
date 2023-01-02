const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.post("/", verifyAccessToken, reportController.addReport);

module.exports = router;
