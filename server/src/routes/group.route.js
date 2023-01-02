const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, groupController.getGroup);
router.get("/member", verifyAccessToken, groupController.getMember);
router.post("/", verifyAccessToken, groupController.createGroup);
router.patch("/", verifyAccessToken, groupController.updateGroup);
router.patch("/join", verifyAccessToken, groupController.joinGroup);

module.exports = router;
