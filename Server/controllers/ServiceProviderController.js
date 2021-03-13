const ServiceProvider = require("../models/ServiceProvider.js");
const bcrypt = require("bcrypt");
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
      } = req.body;
      const serviceProvider = await ServiceProvider.findOne({ email });
      if (serviceProvider) {
        return res.send("sorry this email already exists");
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
      });
      await newServiceProvider.save();
      console.log("make sure", newServiceProvider);
      res.send("successfully registred");
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    }
  },
};
module.exports = serviceProviderCtrl;
