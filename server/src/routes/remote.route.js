const express = require("express");
const router = express.Router();
const remoteController = require("../controllers/remote.controller");
// const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", remoteController.getRemote);

module.exports = router;
