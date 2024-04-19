const mongoose = require("mongoose");
const votingSchema = mongoose.Schema({
  postid: {
    type: String,
    required: true,
  },
  voterid: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model("votersdata", votingSchema);
module.exports = Vote;
