const mongoose = require("mongoose");
const liveMessages = new mongoose.Schema(
  {
    messageBody: { type: String, required: true },
    userId: { type: String, required: true },
    spId: { type: String, required: true },
    isSp: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const messages = mongoose.model("messages", liveMessages);

module.exports = messages;
