const express = require('express')
const router = express.Router();

const {patientController} = require('../controllers/patientController')



    router.get('/patient', patientController.getAllPatient)
    router.get('/patient/:id', patientController.getPatientById)
    router.post('/patient', patientController.createPatient)
    router.put('/patient/:id', patientController.updatePatient)
    router.delete('/patient/:id', patientController.deletePatient)
 

module.exports = router