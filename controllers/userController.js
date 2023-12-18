const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("../passport");
const bcrypt = require("bcryptjs");

exports.index = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().populate("user");
  console.log("index");
  if (req.user) {
    console.log;
    res.render("index", {
      title: "Members Only",
      user: req.user,
      messages: allMessages,
    });
  } else {
    res.render("index", {
      title: "Members Only",
      messages: allMessages,
    });
  }
});

exports.log_in = asyncHandler(async (req, res, next) => {
  try {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
    })(req, res, next);
  } catch (error) {
    res.redirect("/");
  }
});

exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", {
    user: req.user,
  });
});

exports.signup_post = asyncHandler(async (req, res, next) => {
  const user = await User.find({ username: req.body.username });
  if (user.length > 0) {
    res.render("sign-up-form", {
      exists: true,
    });
    return;
  }
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      next(err);
    } else {
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      isAdmin: req.body.isAdmin === "on" ? true : false,
      messages: [],
    });
    const result = await user.save();
    res.redirect("/");
  });
});
exports.logout_get = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});
