const mongoose = require("mongoose");
const moment = require("moment");

const reportSchema = new mongoose.Schema({
  reportBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "Group",
  },
  creationDate: {
    type: Number,
  },
});

reportSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("Report", reportSchema);
