
const {sequelize, Doctor } = require('../models/index')


const getAllDoctor = async(req, res) => {
 
    try {

        const doctor = await Doctor.findAll()
        console.log("🚀 ~ getAllDoctor ~ doctor:", doctor)

        res.status(200).json(doctor)
    } catch (error) {
        console.log("🚀 ~ getAllDoctor ~ error:", error)
        res.status(500).json({message:"something went wrong"})

    }

} 

const getDoctorSchedule = async (req, res) => {
    try {

        const doctorId = req.params.id;
        console.log("🚀 ~ getDoctorSchedule ~ doctorId:", doctorId)


        const [schedule] = await sequelize.query(
            `SELECT * FROM get_doctor_schedule(:doctorId::uuid);`,
            {
                replacements: {doctorId}
            }
        )

        res.json(schedule)
    } catch (error) {
        console.log("🚀 ~ getDoctorSchedule ~ error:", error)
          res.status(500).json({message:"something went wrong"})

    }
}

const createDoctor = async (req, res) => {
    try {
        const {name ,specialization, contact } = req.body;

        const doctor = await Doctor.create({name ,specialization, contact })
        console.log("🚀 ~ createDoctor ~ doctor:", doctor)

        res.status(201).json(doctor)
    } catch (error) {
        console.log("🚀 ~ createDoctor ~ error:", error)
         res.status(500).json({message:"something went wrong"})
    }

}

const deleteDoctor = async (req, res) => {

    try {
        const doctor_id = req.params.id
        const deleteDoc = await Doctor.destroy({
            where: {id: doctor_id}
        })

        if (deleteDoc === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
     res.status(200).json({message: "Doctor deleted"})
    } catch (error) {
        console.log("🚀 ~ deleteDoctor ~ error:", error)
          res.status(500).json({message:"something went wrong"})
        
    }

}

module.exports.doctorController = {getAllDoctor,deleteDoctor, getDoctorSchedule ,createDoctor}
