
const {Service} = require('../models')

const createService = async (req, res) => {
    try {
 
        const {name , cost} = req.body
        const service = await Service.create({name , cost })
        res.status(201).json(service)
    } catch (error) {
        console.log("🚀 ~ createService ~ error:", error)
        res.status(500).json({message:"something went wrong"})
        
    }
}

const getAllService = async (req, res) =>  {
    try {
        const service = await Service.findAll()

        res.status(200).json({service})
    } catch (error) {
        console.log("🚀 ~ getAllService ~ error:", error)
          res.status(500).json({message:"something went wrong"})
        
    }
}

const getServiceById = async (req, res) => {
    try {
        const service_id = req.params.id;
        const service = await Service.findOne({
            where: {
                id: service_id
            }
        })

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(service)
    } catch (error) {
        console.log("🚀 ~ getServiceById ~ error:", error)
            res.status(500).json({message:"something went wrong"})
    }
}

const updateService = async (req, res) => {
    try {
         const {name , cost} = req.body;

         const service_id = req.params.id;
        const service = await Service.findOne({
            where: {
                id: service_id
            }
        })

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.update({name , cost})

        res.status(200).json(service)


    } catch (error) {
        console.log("🚀 ~ updateService ~ error:", error)
         res.status(500).json({message:"something went wrong"})

    }
}

const deleteService = async (req, res) => {
   try {
       const service_id = req.params.id;
        const service = await Service.findOne({
            where: {
                id: service_id
            }
        })

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.destroy()

        res.status(200).json({message: "service deleted"})

   } catch (error) {
    console.log("🚀 ~ deleteService ~ error:", error)
      res.status(500).json({message:"something went wrong"})

   }
}

module.exports.serviceController = {createService, getAllService, getServiceById,updateService, deleteService }