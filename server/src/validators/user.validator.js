const joi = require("joi");

module.exports.getUser = joi.object({
  _id: joi.string(),
  _ids: joi.string(),
});

module.exports.checkUsername = joi.object({
  username: joi.string().required().lowercase(),
});

module.exports.addUser = joi.object({
  username: joi.string().required().lowercase(),
});

module.exports.follow = joi.object({
  _id: joi.string().required(),
  follow: joi.boolean().required().valid(true, false),
});

module.exports.block = joi.object({
  _id: joi.string().required(),
  block: joi.boolean().required().valid(true, false),
});

module.exports.updateUser = joi.object({
  username: joi.string().lowercase(),
  profileImage: joi.any(),
  bio: joi.string(),
  dateOfBirth: joi.number().integer(),
  gender: joi.string().valid("Male", "Female", "Prefer not to say"),
  name: joi.string(),
  webLink: joi.string().uri(),
  fcmToken: joi.string(),
  monetizationEnabled: joi.boolean(),
  preferredPaymentType: joi.string(),
  paymentInfo: joi.object({
    upiId: joi.string(),
    payPalId: joi.string(),
    usdtType: joi.string(),
    usdtWalletAddress: joi.string(),
  }),
});

module.exports.getFollow = joi.object({
  _id: joi.string(),
  type: joi.string().required().lowercase().valid("followers", "following"),
  limit: joi.number().integer().default(18),
  skip: joi.number().integer().default(0),
});

module.exports.getBlocked = joi.object({
  limit: joi.number().integer().default(18),
  skip: joi.number().integer().default(0),
});
