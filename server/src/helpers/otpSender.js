const nodemailer = require("nodemailer");
const Remote = require("../models/Remote.model");
const otpTemplate = require("../static/otpTemplate");

module.exports.sendOtp = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let otp = Math.round(Math.random() * 900000 + 100000).toString();
      const remote = await Remote.find();
      if (remote[0]?.admin?.email === email) {
        otp = remote[0]?.admin?.otp;
      }

      let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.OTP_SENDER_EMAIL,
          pass: process.env.OTP_SENDER_PASSWORD,
        },
      });

      let mailOption = {
        from: `Bevysquare ${process.env.OTP_SENDER_EMAIL}`,
        to: email,
        subject: "Your OTP for Email Verification",
        html: otpTemplate(otp),
      };

      transporter.sendMail(mailOption, (error, success) => {
        if (error) {
          reject(error);
        } else {
          resolve(otp);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
