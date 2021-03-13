const mongoose = require("mongoose");
const services = new mongoose.Schema({
  profession: { type: String, required: true },
});
const Services = mongoose.model("Services", services);

module.exports = Services;
