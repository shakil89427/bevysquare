const mongoose = require("mongoose");

const remoteSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Remote", remoteSchema);
