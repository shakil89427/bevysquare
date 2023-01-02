const mongoose = require("mongoose");
const moment = require("moment");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  type: {
    type: Number,
  },
  description: {
    type: String,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  postImageUrl: {
    type: String,
    default: "",
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  senderUsername: {
    type: String,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "Group",
  },
  groupName: {
    type: String,
  },
  groupImageUrl: {
    type: String,
  },
  creationDate: {
    type: Number,
  },
});

notificationSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("Notification", notificationSchema);
