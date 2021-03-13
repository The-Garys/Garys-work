const mongoose = require("mongoose");
const serviceProviderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    profession: { type: String, required: true },
    location: { type: String, required: true },
    gender: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isServiceProvider: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const ServiceProviders = mongoose.model(
  "ServiceProviders",
  serviceProviderSchema
);

module.exports = ServiceProviders;
