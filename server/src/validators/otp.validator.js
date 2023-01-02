const joi = require("joi");

module.exports.sendOtp = joi.object({
  email: joi.string().required().email().lowercase(),
});

module.exports.verifyOtp = joi.object({
  otp: joi.string().required(),
  email: joi.string().required().email().lowercase(),
});
