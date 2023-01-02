const User = require("../models/User.model");
const Help = require("../models/Help.model");
const createError = require("http-errors");
const helpValidator = require("../validators/help.validator");

module.exports.addHelp = async (req, res, next) => {
  try {
    const result = await helpValidator.addHelp.validateAsync(req.body);
    const user = await User.findOne(
      { _id: req.payload._id },
      { username: 1, profileImageUrl: 1 }
    );
    if (!user) throw createError.NotFound("User not exist");
    const helpData = {
      helpDescription: result.helpDescription,
      userId: req.payload._id,
      username: user.username,
    };
    if (user.profileImageUrl) {
      helpData.profileImageUrl = user.profileImageUrl;
    }
    const help = new Help(helpData);
    await help.save();
    res.send(help);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
