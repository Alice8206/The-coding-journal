const mongoose = require("mongoose");
const User = require("./user.js");

let commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

let Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
