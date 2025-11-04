const express = require('express')
const router = express.Router();

const {patientController} = require('../controllers/patientController');
const { verifyToken } = require('../middlewares/authMiddleware');



    router.get('/patient',   patientController.getAllPatient)
    router.get('/patient/:id', patientController.getPatientById)
    router.post('/patient', patientController.createPatient)
    router.post('/patient/logout', patientController.logoutPatient)
    router.post('/patient/staff', patientController.createPatientByStaff)
    router.post('/patient/login', patientController.patientLogin);
    router.put('/patient/:id', patientController.updatePatient)
    router.delete('/patient/:id', patientController.deletePatient)
 

module.exports = router