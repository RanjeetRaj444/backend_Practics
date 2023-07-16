const mongoose = require("mongoose");

const post = new mongoose.Schema({
  title: { type: String, required: true },
  decriprtion: { type: String, required: true },
  category: { type: String, required: true },
});

const postModel = mongoose.model("posts", post);
module.exports = postModel;
