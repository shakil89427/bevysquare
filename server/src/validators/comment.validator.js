const joi = require("joi");

module.exports.getComment = joi.object({
  _id: joi.string().required(),
  skip: joi.number().integer().default(0),
  limit: joi.number().integer().default(18),
});

module.exports.addComment = joi.object({
  _id: joi.string().required(),
  comment: joi.string().required(),
});

module.exports.deleteComment = joi.object({
  _id: joi.string().required(),
});
