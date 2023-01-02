const joi = require("joi");

module.exports.getNotification = joi.object({
  limit: joi.number().integer().default(18),
  skip: joi.number().integer().default(0),
});
