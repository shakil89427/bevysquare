const joi = require("joi");

module.exports.getMessage = joi.object({
  withUserId: joi.string().required(),
  limit: joi.number().integer().default(18),
  skip: joi.number().integer().default(0),
});
