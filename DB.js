const mongoose = require("mongoose");

const mongooseUrl = "mongodb://127.0.0.1:27017/hotel";

const data = mongoose.connect(mongooseUrl);

module.exports = data;
