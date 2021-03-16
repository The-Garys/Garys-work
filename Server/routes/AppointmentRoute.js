const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");

router.post("/", appointmentController.makeAppointment);
router.get("/" , appointmentController.getAll )

module.exports = router;