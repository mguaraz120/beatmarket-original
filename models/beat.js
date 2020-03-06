// beat
// title: String
// filename: String  // "cc48fa3087f9a8278a38dd951b1b7105.mp3")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beatSchema = new Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true }
});

const Beat = mongoose.model("Beat", beatSchema);

module.exports = Beat;
