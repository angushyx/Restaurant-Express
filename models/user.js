const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set schema of restaurant
const userSchema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);