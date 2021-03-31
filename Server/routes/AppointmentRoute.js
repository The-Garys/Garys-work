const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");

router.post("/", appointmentController.makeAppointment);
router.get("/:name", appointmentController.getAll);
router.get("/getUserApts/:id", appointmentController.getUserApts);
router.delete("/:id", appointmentController.deleteAppointment);
router.put("/approve", appointmentController.approveApp);
router.put("/decline", appointmentController.declineApp);

module.exports = router;
