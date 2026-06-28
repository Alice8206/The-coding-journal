const mongoose = require("mongoose");
const Comment = require("./comment.js");
const User = require("./user.js");

let blogSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

blogSchema.post("findOneAndDelete", async (blog) => {
  if (blog) {
    await Comment.deleteMany({ _id: { $in: blog.comments } });
  }
});

let Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
