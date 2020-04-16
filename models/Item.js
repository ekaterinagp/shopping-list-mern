const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ItemSchema = new Schema({
  name: {
    type: String,
    requires: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  picture: {
    type: String,
    requires: true,
    default: "default.png",
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
