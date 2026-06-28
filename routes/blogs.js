const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js");
const Comment = require("../models/comment.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { blogSchema } = require("../schema.js");
const { isLoggedIn, isAuthor, validateBlog } = require("../middleware.js");
const blogController = require("../controllers/blogs.js");

//home page and create route
router
  .route("/")
  .get(wrapAsync(blogController.homePage))
  .post(isLoggedIn, validateBlog, wrapAsync(blogController.createNewBlog));

//new page
router.get("/new", isLoggedIn, blogController.renderNew);

//search
router.get("/search", wrapAsync(blogController.searchBlog));

//show-update-delete
router
  .route("/:id")
  .get(wrapAsync(blogController.showBlog))
  .patch(isLoggedIn, isAuthor, wrapAsync(blogController.updateBlog))
  .delete(isLoggedIn, isAuthor, wrapAsync(blogController.destroyBlog));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  wrapAsync(blogController.editBlog),
);

//likes
router.post("/:id/likes", isLoggedIn, wrapAsync(blogController.likeBlog));

router.post("/ai/rewrite", blogController.rewriteBlog);

module.exports = router;
