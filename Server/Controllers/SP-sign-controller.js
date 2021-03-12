const { response } = require("express");
var bcrypt = require("bcryptjs");
module.exports.signUp = (req, res) => {
  console.log("jaaarreb", req.body);
  bcrypt.hash(req.body.password, 8, (err, hash) => {
    if (err) {
      console.log("error");
    } else {
      console.log("this is the hashed pass", hash);
    }
  });
  res.send(req.body);
};
