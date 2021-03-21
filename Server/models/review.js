const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    serviceProviderName: { type: String, required: true },
    userName: { type: String, required: true },
    rate: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
