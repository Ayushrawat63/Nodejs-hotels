const mongoose = require("mongoose");
const data = require("../DB");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    required: true,
    enum: ['chef','manager', 'waiter'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
});

const AllUser = mongoose.model("AllUser", userSchema);

module.exports = AllUser;

