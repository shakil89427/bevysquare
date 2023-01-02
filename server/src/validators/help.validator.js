const joi = require("joi");

module.exports.addHelp = joi.object({
  helpDescription: joi.string().required(),
});
