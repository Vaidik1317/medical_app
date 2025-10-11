const express = require('express')
const router = express.Router();
const {appointmentController}  = require('../controllers/appointmentController')


 

    router.get('/appointment', appointmentController.getAllAppointment)
    router.post('/appointment', appointmentController.createAppointment)
    router.put('/appointment/:id', appointmentController.cancelAppointment)


module.exports = router;