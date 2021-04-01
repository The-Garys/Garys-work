const Appointment = require("../models/Appointment");
module.exports = {
  makeAppointment: async (req, res) => {
    //   console.log({
    //     date:req.body.date,
    //     time:req.body.time,
    //     userName: req.body.userName,
    //     email:req.body.email,
    //     serviceProviderName: req.body.serviceProviderName
    // })

    const appointment = new Appointment({
      date: req.body.date,
      time: req.body.time,
      userName: req.body.userName,
      email: req.body.email,
      serviceProviderName: req.body.serviceProviderName,
      sPName: req.body.sPName,
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      userPhoneNumber: req.body.userPhoneNumber,
    });
    try {
      const check = await Appointment.find(
        { date: req.body.date },
        { time: req.body.time }
      );
      console.log("date and time", check);
      if (check.length) {
        return res.send({ data: "not avail" });
      }
      const saveAppointment = await appointment.save();
      console.log("ssaaaaaaaaaaaaaaaa");
      res.json(saveAppointment);
    } catch (err) {
      res.json({ message: err });
    }
  },
  approveApp: async (req, res) => {
    console.log(req.body);
  },
  declineApp: async (req, res) => {
    console.log("req.bodyyy", req.body);
    res.send(req.body);
  },
  getAll: async (req, res) => {
    try {
      const appointment = await Appointment.find({
        serviceProviderName: req.params.name,
      });
      console.log(req.params);
      res.send(appointment);
    } catch (error) {
      console.log(error);
    }
  },

  getUserApts: async (req, res) => {
    try {
      const appointment = await Appointment.find({ userId: req.params.id });
      console.log(req.params);
      res.send(appointment);
    } catch (error) {
      console.log(error);
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const deleteAppointment = await Appointment.findOneAndDelete({
        _id: req.params.id,
      });
      res.send(deleteAppointment);
    } catch (error) {
      console.log(error);
    }
  },
};
