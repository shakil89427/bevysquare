const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, commentController.getComment);
router.post("/", verifyAccessToken, commentController.addComment);
router.delete("/", verifyAccessToken, commentController.deleteComment);

module.exports = router;
