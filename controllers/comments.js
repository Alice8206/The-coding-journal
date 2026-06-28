const Blog = require("../models/blog.js");
const Comment = require("../models/comment.js");

//create
module.exports.create = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const newComment = new Comment(req.body.comment);
  newComment.author = req.user._id;
  await newComment.save();
  blog.comments.push(newComment);
  await blog.save();

  res.redirect(`/blogs/${blog._id}`);
};

//delete
module.exports.delete = async (req, res) => {
  let { id, commentId } = req.params;
  await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);

  res.redirect(`/blogs/${id}`);
};
