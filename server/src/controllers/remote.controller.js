const Remote = require("../models/Remote.model");
const createError = require("http-errors");

module.exports.getRemote = async (_, res, next) => {
  try {
    const remotes = await Remote.find();
    if (!remotes.length) throw createError.NotFound();
    res.send(remotes[0]);
  } catch (error) {
    next(error);
  }
};
