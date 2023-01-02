const joi = require("joi");

module.exports.getChats = joi.object({
  skip: joi.number().integer().default(0),
  limit: joi.number().integer().default(18),
});

module.exports.resetCount = joi.object({
  _id: joi.string().required(),
});
