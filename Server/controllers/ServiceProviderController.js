const ServiceProvider = require("../models/ServiceProvider.js");
const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const serviceProviderCtrl = {
  signUp: async (req, res) => {
    console.log(req.body);
    try {
      const {
        firstName,
        lastName,
        fullName,
        email,
        password,
        phoneNumber,
        profession,
        location,
        gender,
        imageUrl,
      } = req.body;
      const serviceProvider = await ServiceProvider.findOne({ email });
      if (serviceProvider) {
        return res.send({ err: "sorry this email already exists" });
      }
      const user = await Users.findOne({ email });
      if (user) {
        return res.send({ err: "sorry this email already exists" });
      }
      const hashPassword = await bcrypt.hash(password.toString(), 10);
      const newServiceProvider = new ServiceProvider({
        firstName,
        lastName,
        fullName,
        phoneNumber,
        profession,
        location,
        gender,
        email,
        password: hashPassword,
        imageUrl,
      });
      console.log("make sure", newServiceProvider);

      const token = jwt.sign(
        { id: newServiceProvider._id },
        config.toString(),
        {
          expiresIn: 86400, // expires in 24 hours
        }
      );
      newServiceProvider.token = token;
      await newServiceProvider.save();

      console.log("service provider  test====>", newServiceProvider._id);
      res.send({
        id: newServiceProvider._id,
        auth: true,
        token: token,
        success: "successfully registred",
        name: newServiceProvider.firstName,
        greet: "Welcome",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    }
  },
  login: async (req, res) => {
    console.log("req.boy=====>", req.body);
    try {
      const { email, password } = req.body;
      // check if the user already exist or not
      let userProvider = await ServiceProvider.findOne({ email });
      console.log("user login====>", userProvider);
      if (!userProvider) {
        return res.send({ err: "User Not exist" });
      }
      // compare the typed password with password saved for the user
      const isMatch = await bcrypt.compare(
        password.toString(),
        userProvider.password
      );
      console.log("compare====>", isMatch);
      if (!isMatch) {
        return res.send({ err: "Incorrect password" });
      }
      // generate a token for the user

      // const token = jwt.sign(
      //   { id: userProvider._id },
      //   config.secret.toString(),
      //   {
      //     expiresIn: 86400, // expires in 24 hours
      //   }
      // );
      // console.log("user====>", userProvider._id);
       
      res.status(200).send({
        auth: true,
        token: userProvider.token,
        success: "you are logged in successfully",
        id: userProvider._id,
        name: userProvider.firstName,
        greet: "Welcome",
      });
    } catch (error) {
      console.log(error);
    }
  },
  verify: async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.send({ auth: false, err: "No token provided" });
    }
    jwt.verify(token, config.secret.toString(), function (error, decoded) {
      if (error)
        return res.send({ auth: false, err: "Failed to authenticate token." });
      console.log("decoded====>", decoded);
      ServiceProvider.findById(
        decoded.id,
        { password: 0 }, // projection to not get back the password
        function (error, user) {
          if (error) {
            return res.send({ err: "There was a problem finding the user." });
          }
          if (!user) {
            return res.send({ err: "No user found." });
          }

          res.status(200).send(user);
          console.log("user====>", user);
        }
      );
    });
  },
  logout: async (req, res) => {
    res
      .status(200)
      .send({ auth: false, token: null, success: "you are logged out" });
  },
  getSPdata: async (req, res) => {
    try {
      console.log("azffaf", req.body.token);
      var data = await ServiceProvider.findOne({ token: req.body.token });
      res.send(data);
    } catch (err) {
      console.log("azffaf", err);
    }
  },
};
module.exports = serviceProviderCtrl;
