const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("../passport");

exports.add_message = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const mess = new Message({
      message: req.body.message,
      user: req.user.id,
    });
    await mess.save();
    const newMessages = req.user.messages;
    newMessages.push(mess.id);
    await User.findOneAndReplace(
      { _id: req.user.id },
      {
        username: req.user.username,
        password: req.user.password,
        isAdmin: req.user.isAdmin,
        messages: newMessages,
        _id: req.user.id,
      }
    );
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});
exports.delete_message_post = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.body.id);
  const user = await User.findById(message.user);
  const ids = user.messages;

  const newIds = ids.filter((id) => id.toString() !== req.body.id);

  await Message.findByIdAndDelete(req.body.id);
  await User.updateOne({ _id: user.id }, { messages: newIds });

  res.redirect("/");
});
