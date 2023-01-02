const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  senderUsername: {
    type: String,
  },
  status: {
    type: String,
  },
  type: {
    type: String,
  },
  video: {
    type: String,
  },
  audio: {
    type: String,
  },
  picture: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  creationDate: {
    type: Number,
  },
});

module.exports = mongoose.model("Message", messageSchema);
