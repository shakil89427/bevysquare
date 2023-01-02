const Message = require("../models/Message.model");
const messageValidator = require("../validators/message.validator");

module.exports.getMessage = async (req, res, next) => {
  try {
    const result = await messageValidator.getMessage.validateAsync(req.query);
    const ids = [req.payload._id, result.withUserId];
    const messages = await Message.find({
      senderId: { $in: ids },
      receiverId: { $in: ids },
    })
      .sort({ creationDate: -1 })
      .skip(result.skip)
      .limit(result.limit);
    res.send(messages);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
