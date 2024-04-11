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
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
