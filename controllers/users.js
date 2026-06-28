const User = require("../models/user.js");

//signup-get
module.exports.signupGet = (req, res) => {
  res.render("users/signup.ejs");
};

//signup-post
module.exports.signupPost = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let newUser = new User({ username, email });
    let regUser = await User.register(newUser, password);
    req.login(regUser, (e) => {
      if (e) {
        return next(e);
      }
      req.flash("success", "Welcome to coding journal!");
      return res.redirect("/blogs");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//login-get
module.exports.loginGet = (req, res) => {
  res.render("users/login.ejs");
};

//login-post
module.exports.loginPost = (req, res) => {
  req.flash("success", "Welcome back to the coding journal!");
  let redirectUrl = res.locals.redirectUrl || "/blogs";
  res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req, res, next) => {
  req.logout((e) => {
    if (e) {
      return next(e);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/blogs");
  });
};
