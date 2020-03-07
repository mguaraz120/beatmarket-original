const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String
    // required: "Email address is required",
    // unique: true,
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please enter a valid email address"
    // ]
  }
  // created: { type: Date, required: true, default: Date.now() }
});

// User.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
