const Login = require("../models/AdminCred");
const bcrypt = require("bcrypt");

const admin = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPass = await bcrypt.hash(password.toString(), 10);
      const newAdmin = new Login({
        email,
        password: hashedPass,
      });
      await newAdmin.save();
      console.log(newAdmin);
      res.send({ success: "ok" });
    } catch (err) {
      console.log(err);
    }
  },

  verifyLogin: async (req, res) => {
    console.log(req.body);
    try {
      let { email, password } = req.body;

      const admin = await Login.findOne({
        email,
      });
      if (!admin) {
        res.send({ err: "cannot find admin" });
      }
      const isMatched = await bcrypt.compare(
        password.toString(),
        admin.password
      );
      console.log(isMatched);
      console.log(admin);
      if (!isMatched) {
        res.send({ err: "incorrect password" });
      }
      res.send({ msg: "connected", email: email, password: password });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = admin;
