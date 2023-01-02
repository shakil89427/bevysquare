const joi = require("joi");

module.exports.addReport = joi.object({
  _id: joi.string().required(),
  for: joi.string().required().lowercase().valid("user", "post", "group"),
});
