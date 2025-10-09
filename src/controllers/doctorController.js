const {sequelize} = require('../config/connectDB')
const { Doctor } = require('../models/index')


const getAllDoctor = async(req, res) => {

    try {

        const doctor = await Doctor.findAll()

        res.status(200).json(doctor)
    } catch (error) {
        console.log("🚀 ~ getAllDoctor ~ error:", error)
        res.status(500).json({message:"something went wrong"})

    }

}

const getDoctorSchedule = async (req, res) => {
    try {

        const doctorId = req.params.id;


        const [schedule] = await sequelize.query(
            `SELECT * FROM get_doctor_schedule(:doctorId);`,
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

module.exports.doctorController = {getAllDoctor, getDoctorSchedule}
