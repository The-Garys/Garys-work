const Login = require("../models/AdminCred");

const admin = {
  verifyLogin: async (req, res) => {
    try {
      //   let { email, password } = req.body;
      await Login.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      res.json("connected");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = admin;
