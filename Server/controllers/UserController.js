const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  login: async (req, res) => {
    console.log("req.boy=====>", req.body)
    try {
      const {email, password} =req.body
      let user = await Users.findOne({email})
      console.log('user login====>', user)
      if(!user){
        return res.send("User Not exist")
      }
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      console.log("compare====>", isMatch)
      if(!isMatch){
        return res.send("Incorrect password")
      }
      
      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
      // res.send("your logged in!")
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = userCtrl;
