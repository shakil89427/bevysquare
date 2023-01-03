const joi = require("joi");

module.exports.getPost = joi.object({
  _id: joi.string(),
  _ids: joi.string(),
  groupId: joi.string(),
  userId: joi.string(),
  selfOnly: joi.string().valid("true", "false"),
  followingOnly: joi.string().valid("true", "false"),
  groupOnly: joi.string().valid("true", "false"),
  limit: joi.number().integer().default(18),
  skip: joi.number().integer().default(0),
});

module.exports.addPost = joi.object({
  blob: joi.array().items(joi.object({ blob: joi.any() }).required()),
  type: joi.string().required().lowercase().valid("image", "text"),
  description: joi.string().when("type", {
    is: joi.equal("text"),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  groupId: joi.string(),
});

module.exports.like = joi.object({
  _id: joi.string().required(),
  like: joi.boolean().required().valid(true, false),
});

module.exports.save = joi.object({
  _id: joi.string().required(),
  save: joi.boolean().required().valid(true, false),
});

module.exports.updatePost = joi.object({
  _id: joi.string().required(),
  description: joi.string(),
});

module.exports.deletePost = joi.object({
  _id: joi.string().required(),
});
