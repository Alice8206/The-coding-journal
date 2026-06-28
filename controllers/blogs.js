const express = require("express");
const Blog = require("../models/blog.js");
const Comment = require("../models/comment.js");
const ExpressError = require("../utils/ExpressError.js");
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

//main/home  page
module.exports.homePage = async (req, res) => {
  let blogs = await Blog.find().populate("author");
  res.render("blogs/index.ejs", { blogs });
};

//new page
module.exports.renderNew = (req, res) => {
  res.render("blogs/new.ejs");
};

//search
module.exports.searchBlog = async (req, res) => {
  let query = req.query.q;
  if (!query) {
    return res.redirect("/blogs");
  }

  console.log(query);
  let blogs = await Blog.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  });

  res.render("blogs/index.ejs", { blogs });
};

//show
module.exports.showBlog = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(404, "Invalid Blog ID");
  }
  let blog = await Blog.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!blog) {
    throw new ExpressError(404, "Blog not found");
  }
  res.render("blogs/show.ejs", { blog });
};

//create
module.exports.createNewBlog = async (req, res) => {
  let newBlog = new Blog(req.body.blog);
  newBlog.author = req.user._id;
  newBlog.likes = 0;
  await newBlog.save();
  req.flash("success", "New blog created !");
  res.redirect("/blogs");
};

//edit
module.exports.editBlog = async (req, res) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  req.flash("success", "Blog edited!");
  res.render("blogs/edit.ejs", { blog });
};

//update
module.exports.updateBlog = async (req, res) => {
  let { id } = req.params;
  let { content } = req.body.blog;
  let blog = await Blog.findByIdAndUpdate(id, { content });
  req.flash("success", "Blog updated !");
  res.redirect("/blogs");
};

//delete
module.exports.destroyBlog = async (req, res) => {
  let { id } = req.params;
  await Blog.findByIdAndDelete(id);
  req.flash("success", "Blog deleted !");
  res.redirect("/blogs");
};

//like
module.exports.likeBlog = async (req, res) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  const alreadyLiked = blog.likedBy.some((userId) =>
    userId.equals(req.user._id),
  );
  if (alreadyLiked) {
    blog.likedBy = blog.likedBy.filter(
      (userId) => !userId.equals(req.user._id),
    );
    blog.likes--;
  } else {
    blog.likedBy.push(req.user._id);
    blog.likes++;
  }
  await blog.save();

  res.redirect(`/blogs/${id}`);
};

//AI
module.exports.rewriteBlog = async (req, res) => {
  const { draft } = req.body;
  const prompt = `
  Rewrite this blog draft professionally.
Keep the meaning unchanged.
Improve grammar, structure, introduction and conclusion

  Draft:
  ${draft}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  res.json({
    result: response.text,
  });
};
