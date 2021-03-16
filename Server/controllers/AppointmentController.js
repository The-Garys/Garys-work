const Appointment = require("../models/Appointment");

module.exports={
    makeAppointment: async (req, res) => {
       const appointment = new Appointment({
           date:req.body.date,
           userName: req.body.userName,
           email:req.body.email,
           serviceProviderName: req.body.serviceProviderName
       });
          try{
          const saveAppointment = await appointment.save();
          res.json(saveAppointment);
         } catch(err) {
          res.json({message: err})
         }
        },
    
    getAll: async (req, res) => {
        try {
          const appointment = await Appointment.find();
          console.log(appointment);
          res.send(appointment)
        } catch (error) {
          console.log(error);
        }
      },}