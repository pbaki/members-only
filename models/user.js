const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  isAdmin: { type: Boolean },
});

module.exports = mongoose.model("User", UserSchema);
