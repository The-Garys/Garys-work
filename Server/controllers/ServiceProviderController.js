const ServiceProviders = require("../models/ServiceProvider.js");
const bcrypt = require("bcrypt");
const serviceProviderCtrl = {
  signUp: async (req, res) => {
    console.log(req.body);
  },
};
module.exports = serviceProviderCtrl;
