const RecentChat = require("../models/RecentChat.model");
const recentChatValidator = require("../validators/recentChat.validator");
const createError = require("http-errors");

module.exports.getChat = async (req, res, next) => {
  try {
    const result = await recentChatValidator.getChats.validateAsync(req.query);
    const chats = await RecentChat.find({ userId: req.payload._id })
      .sort({ creationDate: -1 })
      .skip(result.skip)
      .limit(result.limit);
    res.send(chats);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.resetCount = async (req, res, next) => {
  try {
    const result = await recentChatValidator.resetCount.validateAsync(req.body);
    const chat = await RecentChat.findOneAndUpdate(
      { _id: result._id },
      { counter: 0 },
      { new: true }
    );
    if (!chat) throw createError.NotFound();
    res.send(chat);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
