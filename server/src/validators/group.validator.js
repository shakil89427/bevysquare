const joi = require("joi");

module.exports.getGroup = joi.object({
  _id: joi.string(),
  _ids: joi.string(),
  groupOnly: joi.string().valid("true", "false").when("_id", {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  text: joi.string(),
  groupLimit: joi.number().integer().default(18),
  groupSkip: joi.number().integer().default(0),
  postLimit: joi.number().integer().default(18),
  postSkip: joi.number().integer().default(0),
});

module.exports.createGroup = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  groupImage: joi.any(),
  coverImage: joi.any(),
});

module.exports.joinGroup = joi.object({
  _id: joi.string().required(),
  join: joi.boolean().required().valid(true, false),
});

module.exports.updateGroup = joi.object({
  _id: joi.string().required(),
  name: joi.string(),
  description: joi.string(),
  groupImage: joi.any(),
  coverImage: joi.any(),
});

module.exports.getMember = joi.object({
  _id: joi.string().required(),
  limit: joi.number().integer().default(18),
  skip: joi.number().integer().default(0),
});
