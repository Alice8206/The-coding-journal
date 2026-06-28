const Blog = require("./models/blog.js");
const Comment = require("./models/comment.js");
const ExpressError = require("./utils/ExpressError.js");
const { commentSchema, blogSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.method == "GET") {
      req.session.redirectUrl = req.originalUrl;
    }
    req.flash("error", "Please login first!");
    return res.redirect("/login");
  }
  next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  if (!blog.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author!");
    return res.redirect(`/blogs`);
  }
  next();
};

module.exports.validateBlog = (req, res, next) => {
  let { error } = blogSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateComment = (req, res, next) => {
  let { error } = commentSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isCommentAuthor = async (req, res, next) => {
  let { id, commentId } = req.params;
  let comment = await Comment.findById(commentId);
  if (!comment.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author!");
    return res.redirect(`/blogs`);
  }
  next();
};
