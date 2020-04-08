const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  name: {
    type: String,
    requires: true,
  },
  email: {
    type: String,
    requires: true,
    unique: true,
  },
  password: {
    type: String,
    requires: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("user", UserSchema);
