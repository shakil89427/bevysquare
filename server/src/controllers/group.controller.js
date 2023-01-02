const createError = require("http-errors");
const Group = require("../models/Group.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const groupValidator = require("../validators/group.validator");
const uploadFile = require("../helpers/uploadFile");

module.exports.getGroup = async (req, res, next) => {
  try {
    const result = await groupValidator.getGroup.validateAsync(req.query);

    // get groups by keyword
    if (result.text) {
      const operator = { $regex: result.text, $options: "i" };
      const groups = await Group.find({
        $or: [{ name: operator }, { description: operator }],
      })
        .skip(result.groupSkip)
        .limit(result.groupLimit);
      return res.send(groups);
    }

    // get groups by ids
    if (result._ids) {
      const groups = await Group.find({ _id: { $in: result._ids.split(",") } });
      return res.send(groups);
    }

    // get grouponly by id
    if (result._id && result.groupOnly === "true") {
      const group = await Group.findOne({ _id: result._id });
      if (!group) throw createError.NotFound();
      return res.send(group);
    }

    const user = await User.findOne(
      { _id: req.payload._id },
      { reportedPosts: 1, blockedUsers: 1 }
    );

    const postIdsNin = [];
    if (Array.isArray(user.reportedPosts)) {
      user.reportedPosts.forEach((_id) => postIdsNin.push(_id.toString()));
    }

    const userIdsNin = [];
    if (Array.isArray(user.blockedUsers)) {
      user.blockedUsers.forEach((_id) => userIdsNin.push(_id.toString()));
    }

    // get group and posts by id
    if (result._id && result.groupOnly === "false") {
      let group = await Group.findOne({ _id: result._id });
      if (!group) throw createError.NotFound();
      group = group.toObject();
      if (Array.isArray(group.members) && group.members.length) {
        const membersIdsIn = group.members.map((_id) => _id.toString());
        const users = await User.find(
          { _id: { $in: membersIdsIn }, profileImageUrl: { $regex: /https/ } },
          { profileImageUrl: 1 }
        ).limit(4);
        group.userImages = users.map((user) => user.profileImageUrl);
      }
      const postQuery = { groupId: result._id };
      if (postIdsNin.length) {
        postQuery["_id"] = { $nin: postIdsNin };
      }
      if (userIdsNin.length) {
        postQuery["userId"] = { $nin: userIdsNin };
      }
      const posts = await Post.find(postQuery)
        .sort({ creationDate: -1 })
        .skip(result.postSkip)
        .limit(result.postLimit);
      return res.send({ group, posts });
    }

    const randomGroups = await Group.find({})
      .sort({ creationDate: -1 })
      .skip(result.groupSkip)
      .limit(result.groupLimit);

    const joinedGroups = await Group.find(
      { members: req.payload._id },
      { _id: 1 }
    );
    if (!Array.isArray(joinedGroups) || !joinedGroups.length) {
      return res.send({ groups: randomGroups, posts: [] });
    }
    const postQuery = {
      groupId: { $in: joinedGroups.map((group) => group._id.toString()) },
    };
    if (postIdsNin.length) {
      postQuery["_id"] = { $nin: postIdsNin };
    }
    if (userIdsNin.length) {
      postQuery["userId"] = { $nin: userIdsNin };
    }
    const posts = await Post.find(postQuery)
      .sort({ creationDate: -1 })
      .skip(result.postSkip)
      .limit(result.postLimit);
    res.send({ groups: randomGroups, posts });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.createGroup = async (req, res, next) => {
  try {
    const result = await groupValidator.createGroup.validateAsync(req.body);
    const { groupImage, coverImage, ...rest } = result;
    rest.adminUserId = req.payload._id;
    rest.members = [req.payload._id];
    if (groupImage) {
      const data = Buffer.from(groupImage, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      const url = await uploadFile(file, "groupblobs");
      rest.groupImageUrl = url;
    }
    if (coverImage) {
      const data = Buffer.from(coverImage, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      const url = await uploadFile(file, "groupblobs");
      rest.coverImageUrl = url;
    }
    const group = new Group(rest);
    await group.save();
    res.send(group);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.joinGroup = async (req, res, next) => {
  try {
    const result = await groupValidator.joinGroup.validateAsync(req.body);
    const joined = await Group.exists({
      _id: result._id,
      members: req.payload._id,
    });
    if (joined && result.join) throw createError.Forbidden("already joined");
    if (!joined && !result.join) throw createError.Forbidden("not joined");
    const updated = result.join
      ? { $push: { members: req.payload._id } }
      : { $pull: { members: req.payload._id } };
    await Group.updateOne({ _id: result._id }, updated);
    res.send({ status: true, message: result.join ? "joined" : "left" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.updateGroup = async (req, res, next) => {
  try {
    const result = await groupValidator.updateGroup.validateAsync(req.body);
    if (Object.keys(result).length < 2) throw createError.Forbidden();
    const { _id, groupImage, coverImage, ...rest } = result;
    const isOwner = await Group.exists({ _id, adminUserId: req.payload._id });
    if (!isOwner) throw createError.Forbidden();
    if (groupImage) {
      const data = Buffer.from(groupImage, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      const url = await uploadFile(file, "groupblobs");
      rest.groupImageUrl = url;
    }
    if (coverImage) {
      const data = Buffer.from(coverImage, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      const url = await uploadFile(file, "groupblobs");
      rest.coverImageUrl = url;
    }
    const group = await Group.findOneAndUpdate({ _id }, rest, {
      new: true,
    });
    if (rest.name || rest.groupImageUrl) {
      await Post.updateMany(
        { groupId: _id },
        { groupName: group.name, groupImageUrl: group.groupImageUrl }
      );
    }
    res.send(group);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.getMember = async (req, res, next) => {
  try {
    const result = await groupValidator.getMember.validateAsync(req.query);
    const group = await Group.findOne(
      { _id: result._id },
      { adminUserId: 1, members: 1 }
    );
    if (!group) throw createError.NotFound("Group not exist");
    const membersIn = [];
    if (Array.isArray(group.members)) {
      group.members.forEach((_id) => membersIn.push(_id.toString()));
    }
    if (!membersIn.length) return res.send([]);
    const members = await User.find({ _id: { $in: membersIn } })
      .skip(result.skip)
      .limit(result.limit);
    const maped = members.map((member) => {
      const temp = member.toObject();
      if (group.adminUserId.toString() === member._id.toString()) {
        temp.isAdmin = true;
      } else {
        temp.isAdmin = false;
      }
      return temp;
    });
    res.send(maped);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
