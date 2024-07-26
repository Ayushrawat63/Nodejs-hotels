const mongoose = require("mongoose")
require('dotenv').config

// const mongooseUrl = "mongodb://127.0.0.1:27017/hotel";
const mongooseUrl= process.env.MongoDB_URL

const data = mongoose.connect(mongooseUrl);

module.exports = data;
