const mongoose = require("mongoose");

// schema for appointment 
const appointmentSchema = new mongoose.Schema(
  {
   userName: { type: String, required: true },
   date:{type:String},
   email: { type: String, required: true },
   serviceProviderName:{type: String, required: true },
   sPName:{type: String },
   userId:{type: String },
   time: { type: String, required: true }
},
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;