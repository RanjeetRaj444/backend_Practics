const mongoose = require("mongoose");

const models = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String },
});

const userModel = mongoose.model("users", models);
module.exports = userModel;
