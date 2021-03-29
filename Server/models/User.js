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
    isBanned: { type: Boolean, default: false },
<<<<<<< HEAD
    imageUrl: { type: String}
    
=======
    location: { type: String },
>>>>>>> ba7bd780dab22570260a5d332a380e802946e757
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
