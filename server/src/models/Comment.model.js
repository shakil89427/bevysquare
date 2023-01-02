const mongoose = require("mongoose");
const moment = require("moment");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  username: {
    type: String,
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
  },
  creationDate: {
    type: Number,
  },
});

commentSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
