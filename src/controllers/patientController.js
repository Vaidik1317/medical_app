const { where } = require('sequelize');
const {Patient} = require('../models')

const createPatient = async (req, res) => {
    try {
        const {name, dob, contact} = req.body;
 

        const patient = await Patient.create({name, dob, contact})
        res.status(201).json(patient)
    } catch (error) {
        console.log("🚀 ~ createPatient ~ error:", error)
          res.status(500).json({message:"something went wrong"})
        
    }
}

const getAllPatient = async (req, res) => {
    try {
        const patient = await Patient.findAll()
        res.status(200).json(patient)
    } catch (error) {
        console.log("🚀 ~ getAllPatient ~ error:", error)
        res.status(500).json({message:"something went wrong"})
        
    }
}

const getPatientById = async(req, res) => {
  try {

    const patient_id = req.params.id
    const patient = await Patient.findOne({
        where: {id: patient_id}
    })

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient)
  } catch (error) {
    console.log("🚀 ~ getPatientById ~ error:", error)
    res.status(500).json({message:"something went wrong"})

  }
}

const updatePatient = async (req, res) => {
    try {
           const {name, dob, contact} = req.body;
             const patient_id = req.params.id
    const patient = await Patient.findOne({
        where: {id: patient_id}
    })

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.update({name, dob, contact});
    res.status(200).json(patient)
    } catch (error) {
          console.log("🚀 ~ updatePatient ~ error:", error)
          res.status(500).json({message:"something went wrong"})
    }
}


const deletePatient = async(req, res) => {
    try {
            const patient_id = req.params.id
    const deletedCount = await Patient.destroy({
        where: {id: patient_id}
    })

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({message: "Patient deleted"})
    } catch (error) {
        console.log("🚀 ~ deletePatient ~ error:", error)
          res.status(500).json({message:"something went wrong"})
    }
}


module.exports.patientController = {createPatient, getAllPatient,getPatientById, updatePatient,deletePatient }