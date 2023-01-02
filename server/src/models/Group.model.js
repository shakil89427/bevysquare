const mongoose = require("mongoose");
const moment = require("moment");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  members: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  creationDate: {
    type: Number,
  },
  adminUserId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  groupImageUrl: {
    type: String,
    default: "",
  },
  coverImageUrl: {
    type: String,
    default: "",
  },
});

groupSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("Group", groupSchema);
