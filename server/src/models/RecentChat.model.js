const mongoose = require("mongoose");

const recentChatSchema = new mongoose.Schema({
  chatImageUrl: {
    type: String,
  },
  counter: {
    type: Number,
    default: 0,
  },
  lastMessage: {
    type: String,
  },
  members: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
  },
  type: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  withUserId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  withUsername: {
    type: String,
  },
  creationDate: {
    type: Number,
  },
  online: {
    type: Boolean,
  },
});

module.exports = mongoose.model("RecentChat", recentChatSchema);
