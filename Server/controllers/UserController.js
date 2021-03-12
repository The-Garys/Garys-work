const Users = require("../models/User");
const bcrypt = require("bcrypt");

const userCtrl = {
  // add a user account
  register: async (req, res) => {
    try {
      console.log("test request", req.body);
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        repeatedPassword,
        phoneNumber,
      } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.send("sorry this email already exists");
      }
      const hashPassword = await bcrypt.hash(password.toString(), 10);
      const newUser = new Users({
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        password: hashPassword,
      });
      await newUser.save();
      console.log("make sure", newUser);

      res.send("successfully registred");
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    }
  },
  // find all users that have an account
  getAll: async (req, res) => {
    try {
      const users = await Users.find();
      console.log(users);
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userCtrl;
