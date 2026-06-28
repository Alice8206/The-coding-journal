const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateComment,
  isLoggedIn,
  isCommentAuthor,
} = require("../middleware.js");
const listingController = require("../controllers/comments.js");

//create comment
router.post(
  "/",
  isLoggedIn,
  validateComment,
  wrapAsync(listingController.create),
);

//delete comment
router.delete(
  "/:commentId",
  isLoggedIn,
  isCommentAuthor,
  wrapAsync(listingController.delete),
);

module.exports = router;
