// customer
// email: String
// firstName: String
// lastName: String
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
