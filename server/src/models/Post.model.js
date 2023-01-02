const mongoose = require("mongoose");
const moment = require("moment");

const postSchema = new mongoose.Schema({
  blob: {
    type: [{ type: { type: String }, url: { type: String }, _id: false }],
    default: [],
  },
  commentCounts: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  saves: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  creationDate: {
    type: Number,
  },
  description: {
    type: String,
    default: "",
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "Group",
  },
  groupImageUrl: {
    type: String,
  },
  groupName: {
    type: String,
  },
  username: {
    type: String,
  },
  textBackImage: {
    type: String,
    default: "",
  },
  type: {
    type: String,
  },
});

postSchema.index({ creationDate: -1, userId: 1, groupId: 1 });

postSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("Post", postSchema);
