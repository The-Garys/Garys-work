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

      const token = jwt.sign(
        { id: userProvider._id },
        config.secret.toString(),
        {
          expiresIn: 86400, // expires in 24 hours
        }
      );
      userProvider.token = token;
      await userProvider.save()
      console.log("user====>", userProvider._id);

      res.status(200).send({
        auth: true,
        token: token,
        success: "you are logged in successfully",
        id: userProvider._id,
        name: userProvider.firstName,
        greet: "Welcome",
        email: userProvider.email
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
  // getSPdata: async (req, res) => {
  //   try {
  //     console.log("getting token", req.params.id);
  //     var data = await ServiceProvider.findOne({ _id: req.params.id });
  //     res.send(data);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // },
  getSPByEmail: async (req, res) => {
    try {
      var data = await ServiceProvider.findOne({ email: req.params.email });
      res.send(data);
    } catch (err) {
      console.log("err", err);
    }
  },
  // update: async (req, res) => {

  //   console.log("id of the svProfile", req.params.id)

  //   console.log("account details", req.body)
  //   try {
  //     const {firstName, lastName, fullName, email,phoneNumber, profession, location}= req.body;
  //     const serviceProvider = await ServiceProvider.findOne({ email });
  //     if (serviceProvider) {
  //       return res.send({ err: "sorry this email already exists" });
  //     }
  //     const user = await Users.findOne({ email });
  //     if (user) {
  //       return res.send({ err: "sorry this email already exists" });
  //     }
  //     let sv= await ServiceProvider.findByIdAndUpdate({_id: req.params.id},{
  //       firstName,
  //       lastName,
  //       fullName,
  //       email,
  //       phoneNumber,
  //       profession,
  //       location
  //     },{new: true})
  //     res.send({success: "updated successfully", data: sv});
  //   console.log("here i am", sv)
  //   } catch (error) {
  //     console.log(error)
  //   }

  // },
  updatePassword: async (req, res) => {
    console.log("password id of the SV", req.params)
    console.log("the body", req.body)
    try {

      const { previousPassword, currentPassword, confirmPassword } = req.body
      if (previousPassword === currentPassword) {
        res.send({ err: "you changed your password to the same password! are you dumb?" })
      }
      const svPassword = await ServiceProvider.findOne({ _id: req.params.id })
      console.log("service password", svPassword.password)

      const isMatch = await bcrypt.compare(previousPassword.toString(), svPassword.password)
      console.log("isMatch", isMatch)
      if (!isMatch) {
        res.send({ err: "incorrect password" })
      }
      const hashCurrentPassword = await bcrypt.hash(currentPassword.toString(), 10);
      console.log('hashed currentpassword', hashCurrentPassword)
      // const hashConfirmPassword = await bcrypt.hash(confirmPassword.toString(), 10);
      // console.log('hashed confirmpassword', hashConfirmPassword)
      const isSame = await bcrypt.compare(confirmPassword.toString(),hashCurrentPassword )
      console.log('isSame', isSame)
      if (!isSame) {
        res.send({ err: "make sure to enter your confirm password correctly" })
      }
      if(isMatch && isSame){
        svPassword.password = hashCurrentPassword

        svPassword.save()
        res.send({ success: "your password changed successfully", data: svPassword.password })
      }


    } catch (error) {
      console.log(error)
    }
  },
  updateFirstName: async (req, res) => {
    console.log(req.params)
    try {
      const { firstName } = req.body
      let sv = await ServiceProvider.findByIdAndUpdate({ _id: req.params.id }, {
        firstName
      }, { new: true })
      console.log("sv first name", sv.firstName)
      res.send({ success: "updated first name successfully", data: sv.firstName })
    } catch (error) {
      console.log(error)
    }
  },
  updateLastName: async (req, res) => {
    console.log(req.params)
    try {
      const { lastName } = req.body
      let sv = await ServiceProvider.findByIdAndUpdate({ _id: req.params.id }, {
        lastName
      }, { new: true })
      console.log("sv last name", sv.lastName)
      res.send({ success: "updated last name successfully", data: sv.lastName })
    } catch (error) {
      console.log(error)
    }
  },
  updateFullName: async (req, res) => {
    console.log(req.params)
    try {
      const { fullName } = req.body
      let sv = await ServiceProvider.findByIdAndUpdate({ _id: req.params.id }, {
        fullName
      }, { new: true })
      console.log("sv fullname", sv.fullName)
      res.send({ success: "updated fullname successfully", data: sv.fullName })
    } catch (error) {
      console.log(error)
    }
  },
  updateEmail: async (req, res) => {
    try {
      const { email } = req.body
      const serviceProvider = await ServiceProvider.findOne({ email });
      if (serviceProvider) {
        return res.send({ err: "sorry this email already exists" });
      }
      const user = await Users.findOne({ email });
      if (user) {
        return res.send({ err: "sorry this email already exists" });
      }
      let sv = await ServiceProvider.findByIdAndUpdate({ _id: req.params.id }, {
        email
      }, { new: true })
      console.log("sv email", sv.email)
      res.send({ success: "updated email successfully", data: sv.email })
    } catch (error) {
      console.log(error)
    }
  },
  updateAdress: async (req, res) => {
    try {
      const { adress } = req.body
      let sv = await ServiceProvider.findByIdAndUpdate({ _id: req.params.id }, {
        adress
      }, { new: true })
      console.log("sv fullname", sv.adress)
      res.send({ success: "updated adress successfully", data: sv.adress })
    } catch (error) {
      console.log(error)
    }
  }
};
module.exports = serviceProviderCtrl;
