const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { verifyAccessToken } = require("../helpers/tokenHelper");

router.get("/", verifyAccessToken, postController.getPost);
router.post("/", verifyAccessToken, postController.addPost);
router.patch("/", verifyAccessToken, postController.updatePost);
router.patch("/like", verifyAccessToken, postController.like);
router.post("/save", verifyAccessToken, postController.save);
router.delete("/", verifyAccessToken, postController.deletePost);

module.exports = router;
