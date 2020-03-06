// license
// name: String
// text: String
// price: number

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const licenseSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  price: Number
});

const License = mongoose.model("License", licenseSchema);

module.exports = License;
