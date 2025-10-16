const { where } = require('sequelize');
const {Patient} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createPatient = async (req, res) => {
    try {
        const {name, dob, contact, email , password} = req.body;
 
      const existingPatient = await Patient.findOne({where: {email}});
      if(existingPatient) return res.status(400).json({message: 'Email already registered'})

        const hashedPassword = await bcrypt.hash(password ,10);

        const patient = await Patient.create({name, dob, contact, email , password : hashedPassword})
        res.status(201).json(patient)
    } catch (error) {
        console.log("🚀 ~ createPatient ~ error:", error)
          res.status(500).json({message:"something went wrong"})
        
    }
}


const patientLogin = async(req, res) => {
        try {
           const { email, password } = req.body;

                const patient = await Patient.findOne({where: {email}});
                console.log("🚀 ~ patientLogin ~ patient:", patient)
      if(!patient) return res.status(400).json({message: 'Patient not found'})

        const isMatch = await bcrypt.compare(password, patient.password)
        console.log("🚀 ~ patientLogin ~ isMatch:", isMatch)

        if(!isMatch) return res.status(401).json({message: 'Invalid creadentials'})

          // generate JWT token

          const token = jwt.sign( {id: patient.id, email: patient.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
            );

            res.status(200).json({message: "Login successful" , token});
        } catch (error) {
          console.log("🚀 ~ patientLogin ~ error:", error)
             res.status(500).json({message:"something went wrong"})
          
        }
}

const createPatientByStaff = async (req, res) => {
  try {
         const {name, dob, contact, email } = req.body;

          if (!name || !contact)
      return res.status(400).json({ message: "Full name and contact are required" });


          
         const byStaff = await Patient.create({name, dob, contact, email})
         console.log("🚀 ~ createPatientByStaff ~ byStaff:", byStaff)
         res.status(201).json(byStaff)
  } catch (error) {
    console.log("🚀 ~ createPatientByStaff ~ error:", error)
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



module.exports.patientController = {createPatient,patientLogin, getAllPatient,getPatientById, updatePatient,deletePatient, createPatientByStaff }