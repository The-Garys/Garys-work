// const Services= require("../../src/app/services-list/mock-service")


const ServiceProviderList = require("../models/ServiceProvider");


module.exports = {
  addServices: async (req, res) => {
    const service = new ServiceProviderList({
      firstName: req.body.userName,
      lastName: "dzadzazdadzazdadada",
      fullName: "dzadzazdadzazdadada",
      email: "dzadzazdadzazdadada",
      password: "dzadzazdadzazdadada",
      phoneNumber: 58065605,
      profession: req.body.profession,
      location: req.body.location,
      gender: "dzadzazdadzazdadada",
      imageUrl:
        "https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg",
      isServiceProvider: true,
    });
    try {
      const savedService = await service.save();
      res.json(savedService);
    } catch (err) {
      res.json({ message: err });
    }
  },

  findAll: async (req, res) => {
    try {
      const services = await ServiceProviderList.find();
      console.log(services);
      res.send(services);
    } catch (error) {
      console.log(error);
    }
  },
};
