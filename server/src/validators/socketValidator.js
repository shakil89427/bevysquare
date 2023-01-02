const joi = require("joi");

module.exports.sendMessage = joi.object({
  message: joi.string().required(),
  status: joi.string().required(),
  senderId: joi.string().required(),
  senderImageUrl: joi.string().required().allow(""),
  senderUsername: joi.string().required(),
  receiverId: joi.string().required(),
  receiverImageUrl: joi.string().required().allow(""),
  receiverUsername: joi.string().required(),
  type: joi
    .string()
    .required()
    .lowercase()
    .valid("image", "video", "audio", "text", "location"),
  picture: joi.any().when("type", {
    is: joi.equal("image"),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  video: joi.any().when("type", {
    is: joi.equal("video"),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  audio: joi.any().when("type", {
    is: joi.equal("audio"),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  latitude: joi.number().when("type", {
    is: joi.equal("location"),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  longitude: joi.number().when("type", {
    is: joi.equal("location"),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
});
