const express = require('express')
const router = express.Router();
const {appointmentController}  = require('../controllers/appointmentController')




    router.get('/appointment', appointmentController.getAllAppointment)
    router.post('/appointment', appointmentController.createAppointment)
    router.patch('/appointment/cancel/:id', appointmentController.cancelAppointment)
    router.get('/appointment/:id', appointmentController.getAppointmentsByPatientId)

    // AppointmentService routes
    router.post('/appointment-service', appointmentController.createAppointmentService)
    router.get('/appointment-service', appointmentController.getAppointmentServices)
    router.get('/appointment-service/:id', appointmentController.getAppointmentServiceById)
    router.put('/appointment-service/:id', appointmentController.updateAppointmentService)
    router.delete('/appointment-service/:id', appointmentController.deleteAppointmentService)
    router.get('/appointment/:id/services', appointmentController.getServicesByAppointmentId);


module.exports = router;
