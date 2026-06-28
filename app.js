if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
let port = 3000;
let methodOverride = require("method-override");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const path = require("path");
const blogRouter = require("./routes/blogs.js");
const commentRouter = require("./routes/comments.js");
const userRouter = require("./routes/users.js");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(cookieParser());

const dbUrl = process.env.MONGODB_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("error in session store", error);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //cookie will remain for 1 week on our website
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/blogs", blogRouter);
app.use("/blogs/:id/comments", commentRouter);
app.use("/", userRouter);

//connection to  db

main()
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

//server
app.listen(port, (req, res) => {
  console.log(`app is listening to port :${port}`);
});

//error handling
app.use((req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.render("error.ejs", { message });
});
