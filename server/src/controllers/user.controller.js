const createError = require("http-errors");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const userValidator = require("../validators/user.validator");
const tokenHelper = require("../helpers/tokenHelper");
const uploadFile = require("../helpers/uploadFile");
const saveNotification = require("../helpers/saveNotification");

module.exports.getUser = async (req, res, next) => {
  try {
    const result = await userValidator.getUser.validateAsync(req.query);
    if (result._id) {
      const user = await User.findOne({ _id: result._id });
      if (!user) throw createError.NotFound();
      return res.send(user);
    }
    if (result._ids) {
      const users = await User.find({ _id: { $in: result._ids.split(",") } });
      return res.send(users);
    }
    const user = await User.findOne({ _id: req.payload._id });
    if (!user) throw createError.NotFound();
    const postcounts = await Post.countDocuments({
      userId: user._id.toString(),
    });
    const accessToken = await tokenHelper.signAccessToken({
      _id: user._id,
      email: user.email,
    });
    res.send({ user, accessToken, postcounts });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = await userValidator.checkUsername.validateAsync(
      req.query
    );
    const existUser = await User.exists({ username });
    res.send({ exist: existUser ? true : false });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.addUser = async (req, res, next) => {
  try {
    const isExistUser = await User.exists({ email: req.payload.email });
    if (isExistUser) throw createError.Forbidden();
    const { username } = await userValidator.addUser.validateAsync(req.body);
    const isExistUsername = await User.exists({ username });
    if (isExistUsername) throw createError.Conflict("Username already taken");
    const user = new User({ email: req.payload.email, username });
    await user.save();
    const accessToken = await tokenHelper.signAccessToken({
      _id: user._id,
      email: user.email,
    });
    res.send({ user, accessToken });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const result = await userValidator.updateUser.validateAsync(req.body);
    if (!Object.keys(result).length) throw createError.Forbidden();
    const { profileImage, ...rest } = result;
    if (rest.username) {
      const isExistUsername = await User.exists({
        _id: { $ne: req.payload._id },
        username: rest.username,
      });
      if (isExistUsername) throw createError.Conflict("Username already taken");
    }
    if (profileImage) {
      const data = Buffer.from(profileImage, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      const url = await uploadFile(file, "userblobs");
      rest.profileImageUrl = url;
    }
    const user = await User.findOneAndUpdate({ _id: req.payload._id }, rest, {
      new: true,
    });
    if (rest.username || rest.profileImageUrl) {
      await Comment.updateMany(
        { userId: req.payload._id },
        { username: user.username, profileImageUrl: user.profileImageUrl }
      );
      await Post.updateMany(
        { userId: req.payload._id },
        { username: user.username, profileImageUrl: user.profileImageUrl }
      );
    }
    res.send(user);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.follow = async (req, res, next) => {
  try {
    const result = await userValidator.follow.validateAsync(req.body);
    const isFollowing = await User.exists({
      _id: req.payload._id,
      following: result._id,
    });
    if (isFollowing && result.follow) {
      throw createError.Forbidden("already following");
    }
    if (!isFollowing && !result.follow) {
      throw createError.Forbidden("not following");
    }
    const current = result.follow
      ? { $push: { following: result._id } }
      : { $pull: { following: result._id } };
    const other = result.follow
      ? { $inc: { followersCount: 1 } }
      : { $inc: { followersCount: -1 } };

    const currentUser = await User.findOneAndUpdate(
      { _id: req.payload._id },
      current,
      { new: result.follow }
    );
    await User.updateOne({ _id: result._id }, other);
    if (result.follow) {
      await saveNotification({
        sender: currentUser,
        receiverId: result._id,
        type: 3,
      });
    }
    res.send({
      status: true,
      message: result.follow ? "followed" : "unfollowed",
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.block = async (req, res, next) => {
  try {
    const result = await userValidator.block.validateAsync(req.body);
    const isBlocked = await User.exists({
      _id: req.payload._id,
      blockedUsers: result._id,
    });
    if (isBlocked && result.block) {
      throw createError.Forbidden("already blocked");
    }
    if (!isBlocked && !result.block) {
      throw createError.Forbidden("not blocked");
    }
    const isFollowing = await User.exists({
      _id: req.payload._id,
      following: result._id,
    });
    if (result.block && isFollowing) {
      await User.updateOne(
        { _id: req.payload._id },
        {
          $push: { blockedUsers: result._id },
          $pull: { following: result._id },
        }
      );
      await User.updateOne({ _id: result._id }, { $inc: { following: -1 } });
    }
    if (result.block && !isFollowing) {
      await User.updateOne(
        { _id: req.payload._id },
        { $push: { blockedUsers: result._id } }
      );
    }
    if (!result.block) {
      await User.updateOne(
        { _id: req.payload._id },
        { $pull: { blockedUsers: result._id } }
      );
    }
    res.send({ status: true, message: result.block ? "blocked" : "unblocked" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.payload._id }, { fcmToken: "" });
    res.send({ status: true, message: "fcmToken deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports.getFollow = async (req, res, next) => {
  try {
    const result = await userValidator.getFollow.validateAsync(req.query);
    if (result.type === "followers") {
      const followers = await User.find({
        following: result?._id ? result._id : req.payload._id,
      })
        .skip(result.skip)
        .limit(result.limit);
      return res.send({ followers });
    }
    if (result.type === "following") {
      const user = await User.findOne(
        { _id: result?._id ? result._id : req.payload._id },
        { following: 1 }
      );
      if (!Array.isArray(user.following)) throw createError.NotFound();
      const _ids = user.following.map((_id) => _id.toString());
      const following = await User.find({ _id: { $in: _ids } })
        .skip(result.skip)
        .limit(result.limit);
      return res.send({ following });
    }
    res.send(false);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.getBlocked = async (req, res, next) => {
  try {
    const result = await userValidator.getBlocked.validateAsync(req.query);
    const user = await User.findOne(
      { _id: req.payload._id },
      { blockedUsers: 1 }
    );
    const _ids = user?.blockedUsers
      ? user.blockedUsers.map((_id) => _id.toString())
      : [];
    if (!_ids.length) return res.send([]);
    const users = await User.find({ _id: { $in: _ids } })
      .skip(result.skip)
      .limit(result.limit);
    res.send(users);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
