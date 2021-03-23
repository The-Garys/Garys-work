const Login = require("../models/AdminCred");
const bcrypt = require("bcrypt");
const Users = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider.js");

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

  banUser: async (req, res) => {
    try {
      await Users.findByIdAndUpdate({ _id: req.params.id }, { isBanned: true });
      res.json({ ok: "User Banned" });
    } catch (err) {
      res.send(err);
    }
  },

  banSp: async (req, res) => {
    try {
      let ali = await ServiceProvider.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isBanned: true }
      );
      res.json({ ok: "Sp Banned!", ali: ali });
    } catch (err) {
      console.log(err);
    }
  },

  unbanUser: async (req, res) => {
    try {
      await Users.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isBanned: false }
      );
      res.json({ ok: "User Unbanned!" });
    } catch (err) {
      console.log(err);
    }
  },
  unbanSp: async (req, res) => {
    try {
      let ali = await ServiceProvider.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isBanned: false }
      );
      res.json({ ok: "Sp Unbanned!", ali: ali });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = admin;
