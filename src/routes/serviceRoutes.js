const express = require("express");
const router = express.Router();
const { serviceController } = require("../controllers/serviceController");

// ======= Existing Service Routes (optional: keep for now, or remove later) =======
// router.get("/service", serviceController.getAllService);
// router.get("/service/:id", serviceController.getServiceById);
// router.post("/service", serviceController.createService);
// router.put("/service/:id", serviceController.updateService);
// router.delete("/service/:id", serviceController.deleteService);

// ======= New General Services =======
router.get("/general", serviceController.getAllGeneralServices);
router.post("/general", serviceController.createGeneralService);
router.put("/general/:id", serviceController.updateGeneralService);
router.delete("/general/:id", serviceController.deleteGeneralService);

// ======= New Doctor-Specific Services =======
router.get("/doctor-services", serviceController.getAllDoctorServices);
router.get("/doctor-services/:doctorId", serviceController.getDoctorServices);
router.post("/doctor-services", serviceController.createDoctorService);
router.put("/doctor-services/:id", serviceController.updateDoctorService);
router.delete("/doctor-services/:id", serviceController.deleteDoctorService);

// ======= Combined (for booking / patient view) =======
router.get("/available/:doctorId", serviceController.getAvailableServicesForDoctor);

module.exports = router;
