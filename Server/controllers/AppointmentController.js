const Appointment = require("../models/Appointment");

module.exports={
    makeAppointment: async (req, res) => {
       const appointment = new Appointment({
           date:req.body.date,
           time:req.body.time,
           userName: req.body.userName,
           email:req.body.email,
           serviceProviderName: req.body.serviceProviderName
       });
          try{
          const check= await Appointment.find({date:req.body.date},{ time: req.body.time})
          console.log('date and time', check.length)
          if(check.length){
            return res.send({data : "not avail"})
          } else {
            const saveAppointment = await appointment.save();
            res.json(saveAppointment);
          }
 
         } catch(err) {
          res.json({message: err})
         }
        },
    
      
      getAll: async (req, res) => {
        try {
          const appointment = await Appointment.find({serviceProviderName : req.params.name});
          console.log(req.params);
          res.send(appointment)
        } catch (error) {
          console.log(error);
        }
      },


    
    }