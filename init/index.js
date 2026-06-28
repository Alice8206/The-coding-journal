const mongoose = require("mongoose");
const Blog = require("../models/blog.js");
const blogs = require("./data.js");

main()
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogging");
}

const initDb = async () => {
  await Blog.deleteMany({});
  blogs.blogs = blogs.blogs.map((obj) => ({
    ...obj,
    author: "6a3cbda8a7252892d8cc3cd4",
  }));
  await Blog.insertMany(blogs.blogs);
  console.log("data is initialized");
};
initDb();
