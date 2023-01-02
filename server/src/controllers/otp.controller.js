const createError = require("http-errors");
const User = require("../models/User.model");
const Otp = require("../models/Otp.model");
const otpValidator = require("../validators/otp.validator");
const otpSender = require("../helpers/otpSender");
const tokenHelper = require("../helpers/tokenHelper");

module.exports.sendOtp = async (req, res, next) => {
  try {
    const { email } = await otpValidator.sendOtp.validateAsync(req.query);
    const otp = await otpSender.sendOtp(email);
    await Otp.updateOne({ email }, { email, otp }, { upsert: true });
    res.send({ status: true, message: "Otp sended successfully" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports.verifyOtp = async (req, res, next) => {
  try {
    const result = await otpValidator.verifyOtp.validateAsync(req.body);
    const isSuccess = await Otp.findOneAndDelete(result);
    if (!isSuccess) throw createError.UnprocessableEntity();
    const user = await User.findOne({ email: result.email });
    if (user) {
      const accessToken = await tokenHelper.signAccessToken({
        _id: user._id,
        email: user.email,
      });
      return res.send({ user, accessToken });
    }
    const newUserToken = await tokenHelper.signNewUserToken({
      email: result.email,
    });
    res.send({ newUserToken });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
