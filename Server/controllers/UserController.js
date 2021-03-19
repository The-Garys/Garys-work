const Users = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config")

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
        phoneNumber,
      } = req.body;
      // check if the email is exist or not 
      const user = await Users.findOne({ email });
      if (user) {
        return res.send({err:"sorry this email already exists"});
      }
      const serviceProvider = await ServiceProvider.findOne({ email });
      if(serviceProvider){
        return res.send({err:"sorry this email already exists"});
      }
      // hash the password and save the account information
      const hashPassword = await bcrypt.hash(password.toString(), 10);
      const newUser = new Users({
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        password: hashPassword,
      });
        // generate a token for the user
        const token = jwt.sign({ id: newUser._id }, config.toString(), {
          expiresIn: 86400 // expires in 24 hours
        })
        newUser.token = token
      await newUser.save();
      console.log("make sure", newUser);
    
      console.log('user test====>', newUser._id)
      res.send({ auth: true, token: token, success: "successfully registred", id: newUser._id, name: newUser.userName ,greet: "Welcome"});
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
  // login with an existing account 
  login: async (req, res) => {
    console.log("req.boy=====>", req.body);
    try {
      const { email, password } = req.body
      // check if the user already exist or not 
      let user = await Users.findOne({ email })
      console.log('user login====>', user)
      if (!user) {
        return res.send({err:"User Not exist" } )
      }
      // compare the typed password with password saved for the user
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      console.log("compare====>", isMatch)
      if (!isMatch) {
        return res.send({err: "Incorrect password"})
      }
      // generate a token for the user
      const token = jwt.sign({ id: user._id }, config.secret.toString(), {
        expiresIn: 86400 // expires in 24 hours
      });
      user.token = token;
      await user.save();
      console.log('user====>', user._id)

      res.status(200).send({ auth: true, token: token, success: "you are logged in successfully" , id: user._id, name: user.userName, greet: "Welcome"});


    } catch (error) {
      console.log(error);
    }
  },
  // verify the user with user's token
  verify: async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.send({ auth: false, err: 'No token provided' });
    }
    jwt.verify(token, config.secret.toString(), function (error, decoded) {
      if (error) return res.send({ auth: false, err: 'Failed to authenticate token.' });
      console.log("decoded====>", decoded)
      Users.findById(decoded.id,
        { password: 0 }, // projection to not get back the password
        function (error, user) {
          if (error) {
            return res.send({err:"There was a problem finding the user."});
          }
          if (!user) {
            return res.send({err: "No user found."});
          }

          res.status(200).send(user);
          console.log("user====>", user)
        });
    });
  },
  logout: async (req, res) => {
    res.status(200).send({ auth: false, token: null, success: "you are logged out" });
  }
};

module.exports = userCtrl;
