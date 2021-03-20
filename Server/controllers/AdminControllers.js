const Login = require("../models/AdminCred");

const admin = {
  post: async (req, res) => {
    try {
      let { email, password } = req.body;
      const post = new Login({
        email,
        password,
      });
      await post.save();
      res.send("account created");
    } catch (err) {
      res.send(err);
    }
  },

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
