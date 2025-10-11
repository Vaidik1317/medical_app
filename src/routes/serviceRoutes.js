const express = require('express')
const router = express.Router();
const {serviceController}  = require('../controllers/serviceController')


    router.get('/service', serviceController.getAllService )
    router.get('/service/:id', serviceController.getServiceById)
    router.post('/service', serviceController.createService )
    router.put('/service/:id', serviceController.updateService )
    router.delete('/service/:id', serviceController.deleteService )


module.exports = router 