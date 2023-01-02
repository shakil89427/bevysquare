const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  verifyAccessToken,
  verifyNewUserToken,
} = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, userController.getUser);
router.get("/username", userController.checkUsername);
router.get("/blocked", verifyAccessToken, userController.getBlocked);
router.get("/follow", verifyAccessToken, userController.getFollow);
router.post("/", verifyNewUserToken, userController.addUser);
router.patch("/", verifyAccessToken, userController.updateUser);
router.patch("/follow", verifyAccessToken, userController.follow);
router.patch("/block", verifyAccessToken, userController.block);
router.delete("/", verifyAccessToken, userController.logout);

module.exports = router;
