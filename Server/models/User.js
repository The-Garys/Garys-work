const mongoose = require("mongoose");

// schema for the user
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    repeatedPassword: { type: String },
    phoneNumber: { type: Number },
    isServiceProvider: { type: Boolean, default: false },
    // token: { type: String, required: true }
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
