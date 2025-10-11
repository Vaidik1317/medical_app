const express = require('express')
const router = express.Router();
const {doctorController} = require('../controllers/doctorController')



    router.get('/doctor', doctorController.getAllDoctor)
    router.post('/doctor', doctorController.createDoctor)
    router.get('/doctor/:id', doctorController.getDoctorSchedule)

    
module.exports = router
