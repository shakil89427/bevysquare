const createError = require("http-errors");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const saveNotification = require("../helpers/saveNotification");
const commentValidator = require("../validators/comment.validator");

module.exports.getComment = async (req, res, next) => {
  try {
    const result = await commentValidator.getComment.validateAsync(req.query);
    const comments = await Comment.find({ postId: result._id })
      .sort({ creationDate: -1 })
      .skip(result.skip)
      .limit(result.limit);
    res.send(comments);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.addComment = async (req, res, next) => {
  try {
    const result = await commentValidator.addComment.validateAsync(req.body);
    const user = await User.findOne(
      { _id: req.payload._id },
      { username: 1, profileImageUrl: 1 }
    );
    if (!user) throw createError.Forbidden();
    const commentData = {
      userId: req.payload._id,
      postId: result._id,
      username: user.username,
      comment: result.comment,
    };
    if (user.profileImageUrl) {
      commentData.profileImageUrl = user.profileImageUrl;
    }
    const comment = new Comment(commentData);
    await comment.save();
    const post = await Post.findOneAndUpdate(
      { _id: result._id },
      { $inc: { commentCounts: 1 } },
      { new: true }
    );
    await saveNotification({ sender: user, post, type: 2 });
    res.send(comment);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    const { _id } = await commentValidator.deleteComment.validateAsync(
      req.query
    );
    const comment = await Comment.findOneAndDelete({
      _id,
      userId: req.payload._id,
    });
    if (!comment) throw createError.NotFound();
    await Post.updateOne(
      { _id: comment.postId.toString() },
      { $inc: { commentCounts: -1 } }
    );
    res.send(comment);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
