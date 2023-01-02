const Notification = require("../models/Notification.model");
const notificationValidator = require("../validators/notification.validator");

module.exports.getNotification = async (req, res, next) => {
  try {
    const result = await notificationValidator.getNotification.validateAsync(
      req.query
    );
    const notifications = await Notification.find({
      receiverId: req.payload._id,
    })
      .sort({ creationDate: -1 })
      .skip(result.skip)
      .limit(result.limit);
    res.send(notifications);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
