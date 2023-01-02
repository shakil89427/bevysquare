const Report = require("../models/Report.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const reportValidator = require("../validators/report.validator");

module.exports.addReport = async (req, res, next) => {
  try {
    const result = await reportValidator.addReport.validateAsync(req.body);
    const reportData = { reportBy: req.payload._id };
    if (result.for === "user") {
      reportData.userId = result._id;
    }
    if (result.for === "post") {
      reportData.postId = result._id;
    }
    if (result.for === "group") {
      reportData.groupId = result._id;
    }
    const report = new Report(reportData);
    await report.save();
    if (result.for === "post") {
      await User.updateOne(
        { _id: req.payload._id },
        { $push: { reportedPosts: result._id } }
      );
      await Post.updateOne(
        { _id: result._id },
        { $pull: { saves: req.payload._id } }
      );
    }
    res.send(report);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
