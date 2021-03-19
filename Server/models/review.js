const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    serviceProviderId: { type: String, required: true },
    userId: { type: String, required: true },
    reviewTitle: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
