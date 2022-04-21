const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set schema of restaurant
const userSchema = new Schema({
  originalURL: { type: String, required: true },
  shortenURL: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
