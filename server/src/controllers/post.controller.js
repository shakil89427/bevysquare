const createError = require("http-errors");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Group = require("../models/Group.model");
const Comment = require("../models/Comment.model");
const Report = require("../models/Report.model");
const uploadFile = require("../helpers/uploadFile");
const postValidator = require("../validators/postValidator");
const saveNotification = require("../helpers/saveNotification");

module.exports.getPost = async (req, res, next) => {
  try {
    const result = await postValidator.getPost.validateAsync(req.query);

    // Single post by id
    if (result._id) {
      const post = await Post.findOne({ _id: result._id });
      if (!post) throw createError.NotFound();
      return res.send(post);
    }

    // Multiple posts by ids
    if (result._ids) {
      const posts = await Post.find({ _id: { $in: result._ids.split(",") } });
      return res.send(posts);
    }

    // Posts by userId
    if (result.userId) {
      const user = await User.findOne({ _id: result.userId });
      if (!user) throw createError.NotFound();
      const counts = await Post.countDocuments({ userId: user._id.toString() });
      const posts = await Post.find({ userId: user._id.toString() })
        .sort({ creationDate: -1 })
        .skip(result.skip)
        .limit(result.limit);
      return res.send({ user, posts, counts });
    }

    // Self posts
    if (result.selfOnly === "true") {
      const posts = await Post.find({ userId: req.payload._id })
        .sort({ creationDate: -1 })
        .skip(result.skip)
        .limit(result.limit);
      return res.send(posts);
    }

    // Posts from followings
    if (result.followingOnly === "true") {
      const user = await User.findOne(
        { _id: req.payload._id },
        { following: 1 }
      );
      if (!user || !Array.isArray(user.following) || !user.following.length) {
        return res.send([]);
      }
      const ids = user.following.map((_id) => _id.toString());
      const posts = await Post.find({ userId: { $in: ids } })
        .sort({ creationDate: -1 })
        .skip(result.skip)
        .limit(result.limit);
      return res.send(posts);
    }

    // Posts from joinedgroups
    if (result.groupOnly === "true") {
      const groups = await Group.find({ members: req.payload._id }, { _id: 1 });
      if (!Array.isArray(groups) || !groups.length) {
        return res.send([]);
      }
      const ids = groups.map((group) => group._id.toString());
      const posts = await Post.find({ groupId: { $in: ids } })
        .sort({ creationDate: -1 })
        .skip(result.skip)
        .limit(result.limit);
      return res.send(posts);
    }

    const user = await User.findOne(
      { _id: req.payload._id },
      { reportedPosts: 1, blockedUsers: 1, following: 1 }
    );
    const groups = await Group.find({ members: req.payload._id }, { _id: 1 });

    const postIdsNin = [];
    if (Array.isArray(user.reportedPosts)) {
      user.reportedPosts.forEach((_id) => postIdsNin.push(_id.toString()));
    }

    const userIdsNin = [];
    if (Array.isArray(user.blockedUsers)) {
      user.blockedUsers.forEach((_id) => userIdsNin.push(_id.toString()));
    }

    const userIdsIn = [req.payload._id];
    if (Array.isArray(user.following)) {
      user.following.forEach((_id) => {
        const tempId = _id.toString();
        if (userIdsNin.indexOf(tempId) === -1) {
          userIdsIn.push(tempId);
        }
      });
    }

    const groupIdsIn = [];
    if (Array.isArray(groups) && groups.length) {
      groups.forEach((group) => groupIdsIn.push(group._id.toString()));
    }

    const matchedQuery = {};
    if (postIdsNin.length) {
      matchedQuery["_id"] = { $nin: postIdsNin };
    }
    if (userIdsIn.length && !groupIdsIn.length) {
      matchedQuery["userId"] = { $in: userIdsIn };
    }
    if (!userIdsIn.length && groupIdsIn.length) {
      matchedQuery["groupId"] = { $in: groupIdsIn };
    }
    if (userIdsIn.length && groupIdsIn.length) {
      matchedQuery["$or"] = [
        { userId: { $in: userIdsIn } },
        { groupId: { $in: groupIdsIn } },
      ];
    }

    const matchedPosts = await Post.find(matchedQuery)
      .sort({ creationDate: -1 })
      .skip(result.skip)
      .limit(result.limit);

    if (matchedPosts.length) {
      return res.send(matchedPosts);
    }

    const randomQuery = {};
    if (postIdsNin.length) {
      randomQuery["_id"] = { $nin: postIdsNin };
    }
    if (userIdsNin.length) {
      randomQuery["userId"] = { $nin: userIdsNin };
    }
    const randomPosts = await Post.find(randomQuery)
      .sort({ creationDate: -1 })
      .skip(result.skip)
      .limit(result.limit);
    res.send(randomPosts);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.addPost = async (req, res, next) => {
  try {
    const result = await postValidator.addPost.validateAsync(req.body);
    if (result.groupId) {
      const isExist = await Group.exists({ _id: result.groupId });
      if (!isExist) throw createError.NotFound("group not exist");
    }
    const user = await User.findOne(
      { _id: req.payload._id },
      { username: 1, profileImageUrl: 1 }
    );
    if (!user) throw createError.NotFound("user not exist");
    const promises = result.blob.map(({ blob }) => {
      const data = Buffer.from(blob, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      return uploadFile(file, "postblobs");
    });
    const urls = await Promise.all(promises);
    const postData = {
      userId: req.payload._id,
      username: user.username,
      type: result.type,
    };
    if (user.profileImageUrl) {
      postData.profileImageUrl = user.profileImageUrl;
    }
    if (result.description) {
      postData.description = result.description;
    }
    if (result.type === "text") {
      postData.textBackImage = urls[0];
    }
    if (result.type === "image") {
      postData.blob = urls.map((url) => ({ type: "image", url }));
    }
    if (result.groupId) {
      const group = await Group.findOne(
        { _id: result.groupId },
        { groupImageUrl: 1, name: 1 }
      );
      postData.groupId = result.groupId;
      postData.groupImageUrl = group.groupImageUrl;
      postData.groupName = group.name;
    }
    const post = new Post(postData);
    await post.save();
    res.send(post);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.like = async (req, res, next) => {
  try {
    const result = await postValidator.like.validateAsync(req.body);
    const user = await User.findOne({ _id: req.payload._id });
    if (!user) throw createError.NotFound("user not exist");
    const liked = await Post.exists({
      _id: result._id,
      likes: req.payload._id,
    });
    if (liked && result.like) throw createError.Forbidden("already liked");
    if (!liked && !result.like) throw createError.Forbidden("not liked");
    const updated = result.like
      ? { $push: { likes: req.payload._id } }
      : { $pull: { likes: req.payload._id } };
    const post = await Post.findOneAndUpdate({ _id: result._id }, updated, {
      new: result.like,
    });
    if (result.like) {
      await saveNotification({ sender: user, post, type: 1 });
    }
    res.send({ status: true, message: result.like ? "liked" : "disliked" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.save = async (req, res, next) => {
  try {
    const result = await postValidator.save.validateAsync(req.body);
    const saved = await Post.exists({
      _id: result._id,
      saves: req.payload._id,
    });
    if (saved && result.save) throw createError.Forbidden("already saved");
    if (!saved && !result.save) throw createError.Forbidden("not saved");
    const updated = result.save
      ? { $push: { saves: req.payload._id } }
      : { $pull: { saves: req.payload._id } };
    await Post.updateOne({ _id: result._id }, updated);
    res.send({ succes: true, message: result.save ? "saved" : "unsaved" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const { _id } = await postValidator.deletePost.validateAsync(req.query);
    const ownPost = await Post.exists({ _id, userId: req.payload._id });
    if (!ownPost) throw createError.Forbidden();
    const post = await Post.findOneAndDelete({ _id });
    await User.updateMany({}, { $pull: { reportedPosts: _id } });
    await Comment.deleteMany({ postId: _id });
    await Report.deleteMany({ postId: _id });
    res.send(post);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const result = await postValidator.updatePost.validateAsync(req.body);
    if (Object.keys(result).length < 2) throw createError.Forbidden();
    const ownPost = await Post.exists({
      _id: result._id,
      userId: req.payload._id,
    });
    if (!ownPost) throw createError.Forbidden();
    const post = await Post.findOneAndUpdate(
      { _id: result._id },
      { description: result.description },
      { new: true }
    );
    res.send(post);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
