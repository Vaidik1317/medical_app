const {sequelize} = require('../config/connectDB')

const createAppointment = async (req, res) => {
    try {
        const {patient_id, doctor_id , start_time,  end_time, } = req.body;

        await sequelize.query(
            `CALL schedule_appointment(:patient_id, :doctor_id, :start_time, :end_time);`,
            {
                replacements: {patient_id, doctor_id, start_time, end_time}
            }
        );

        res.status(201).json({message: "Appointment scheduled successfully"})
    } catch (error) {
        console.log("🚀 ~ createAppointment ~ error:", error)
        res.status(500).json({message:"something went wrong"})
        
    } 

}

const cancelAppointment = async (req, res) => {
    try {
        const {appointment_id} = req.body;

        await sequelize.query(
            `CALL cancel_appointment(:appointment_id);`,
            {
                replacements: {appointment_id}
            }
        );
        res.status(200).json({message: "Appointment cancelled"})
    } catch (error) {
        console.log("🚀 ~ cancelAppointment ~ error:", error)
         res.status(500).json({message:"something went wrong"})
    }

}

module.exports.patientController = { createAppointment , cancelAppointment, }