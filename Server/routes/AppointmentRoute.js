const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");

router.post("/", appointmentController.makeAppointment);
router.get("/:name", appointmentController.getAll);
router.get("/getUserApts/:id", appointmentController.getUserApts);

module.exports = router;
