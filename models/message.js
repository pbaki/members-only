const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true, maxLength: 100 },
  date: { type: Date, default: new Date() },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

MessageSchema.virtual("dateConverted").get(function () {
  const formattedDate = this.date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate;
});

module.exports = mongoose.model("Message", MessageSchema);
