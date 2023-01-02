const mongoose = require("mongoose");
const moment = require("moment");

const helpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  helpDescription: {
    type: String,
  },
  creationDate: {
    type: Number,
  },
});

helpSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("Help", helpSchema);
