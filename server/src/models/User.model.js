const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  creationDate: {
    type: Number,
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  followersCount: {
    type: Number,
    default: 0,
  },
  following: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  blockedUsers: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  reportedPosts: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Number,
  },
  gender: {
    type: String,
  },
  name: {
    type: String,
    default: "",
  },
  webLink: {
    type: String,
    default: "",
  },
  fcmToken: {
    type: String,
    default: "",
  },
  monetizationEnabled: {
    type: Boolean,
    default: false,
  },
  online: {
    type: Boolean,
  },
  preferredPaymentType: {
    type: String,
  },
  paymentInfo: {
    upiId: {
      type: String,
    },
    payPalId: {
      type: String,
    },
    usdtType: {
      type: String,
    },
    usdtWalletAddress: {
      type: String,
    },
  },
});

userSchema.pre("save", function (next) {
  this.creationDate = moment().unix();
  next();
});

module.exports = mongoose.model("User", userSchema);
