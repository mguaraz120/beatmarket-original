const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beatSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Beat = mongoose.model("Beat", beatSchema);

module.exports = Beat;
