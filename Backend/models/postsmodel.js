const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  posterid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  vote: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  voluenteer: {
    type: String,
  },
  rate: {
    type: Number,
  },
  solution: {
    type: String,
  },
  path: {
    type: String,
  },
  approved: {
    type: String,
  },
  fileOriginalName: {
    type: String,
  },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
