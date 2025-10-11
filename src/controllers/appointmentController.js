const {sequelize, Appointment} = require('../models');

const createAppointment = async (req, res) => { 
    try {
        const {patient_id, doctor_id, start_time, end_time } = req.body;

        await sequelize.query(
            `CALL schedule_appointment(:patient_id::uuid, :doctor_id::uuid, :start_time, :end_time);`,
            {
                replacements: { patient_id, doctor_id, start_time, end_time }
            }
        );

        res.status(201).json({ message: "Appointment scheduled successfully" });
    } catch (error) {
        console.log("🚀 ~ createAppointment ~ error:", error);
        res.status(500).json({ message: "something went wrong" });
    } 
};

const cancelAppointment = async (req, res) => {
    try {
        const appointment_id = req.params.id;

        await sequelize.query(
            `CALL cancel_appointment(:appointment_id::uuid);`,
            { replacements: { appointment_id } }
        );

        res.status(200).json({ message: "Appointment cancelled" });
    } catch (error) {
        console.log("🚀 ~ cancelAppointment ~ error:", error);
        res.status(500).json({ message: "something went wrong" });
    }
};

const getAllAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        console.log("🚀 ~ getAllAppointment ~ error:", error);
        res.status(500).json({ message: "something went wrong" });
    }
};

module.exports.appointmentController = { createAppointment, cancelAppointment, getAllAppointment };
