const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const listingController = require("../controllers/users.js");

//signup route
router
  .route("/signup")
  .get(listingController.signupGet)
  .post(wrapAsync(listingController.signupPost));

//login-route
router
  .route("/login")
  .get(listingController.loginGet)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    listingController.loginPost,
  );

router.get("/logout", listingController.logout);

module.exports = router;
