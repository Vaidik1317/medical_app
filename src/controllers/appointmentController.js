const {sequelize, Appointment, AppointmentService, Service} = require('../models');

const createAppointment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { patient_id, doctor_id, start_time, end_time, services = [] } = req.body;

    // 1️⃣ Create appointment using stored procedure with conflict checking
    await sequelize.query(
      `CALL schedule_appointment(:patient_id, :doctor_id, :start_time, :end_time);`,
      {
        replacements: { patient_id, doctor_id, start_time, end_time },
        transaction: t,
      }
    );

    // 2️⃣ Get the created appointment
    const [appointmentResult] = await sequelize.query(
      `SELECT * FROM appointments
       WHERE patient_id = :patient_id
       AND doctor_id = :doctor_id
       AND start_time = :start_time
       AND end_time = :end_time;`,
      {
        replacements: { patient_id, doctor_id, start_time, end_time },
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
      }
    );

    const appointment = appointmentResult;

    // 3️⃣ Add appointment services
    if (Array.isArray(services) && services.length > 0) {
      const bulkData = services.map((s) => ({
        appointment_id: appointment.id,
        service_id: s.service_id,
        quantity: s.quantity || 1,
      }));

      await AppointmentService.bulkCreate(bulkData, { transaction: t });
    }

    await t.commit();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("🚀 ~ createAppointment ~ error:", error);
    await t.rollback();

    // Check if it's a conflict error from the stored procedure
    if (error.message && error.message.includes('Doctor has another appointment during this time')) {
      return res.status(409).json({
        message: "Doctor is not available at this time. Please choose a different time slot.",
        error: "CONFLICT"
      });
    }

    res.status(500).json({ message: "Something went wrong" });
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

const getAppointmentsByPatientId = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const appointments = await Appointment.findAll({
            where: { patient_id },
            include: [
                { model: require('../models').Doctor, as: 'doctor' },
                { model: require('../models').AppointmentService, as: 'services', include: [{ model: require('../models').Service, as: 'service' }] }
            ]
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.log("🚀 ~ getAppointmentsByPatientId ~ error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
const createAppointmentService = async (req, res) => {
    try {
        const { appointment_id, service_id, quantity } = req.body;

        const appointmentService = await AppointmentService.create({
            appointment_id,
            service_id,
            quantity: quantity || 1
        });

        res.status(201).json({ message: "Appointment service created successfully", data: appointmentService });
    } catch (error) {
        console.log("🚀 ~ createAppointmentService ~ error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getAppointmentServices = async (req, res) => {
    try {
        const appointmentServices = await AppointmentService.findAll({
            include: [
                { model: Appointment, as: 'appointment' },
                { model: Service, as: 'service' }
            ]
        });
        res.status(200).json(appointmentServices);
    } catch (error) {
        console.log("🚀 ~ getAppointmentServices ~ error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getAppointmentServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointmentService = await AppointmentService.findOne({
            where: { id },
            include: [
                { model: Appointment, as: 'appointment' },
                { model: Service, as: 'service' }
            ]
        });

        if (!appointmentService) {
            return res.status(404).json({ message: 'Appointment service not found' });
        }

        res.status(200).json(appointmentService);
    } catch (error) {
        console.log("🚀 ~ getAppointmentServiceById ~ error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateAppointmentService = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointment_id, service_id, quantity } = req.body;

        const [updated] = await AppointmentService.update(
            { appointment_id, service_id, quantity },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Appointment service not found' });
        }

        const updatedAppointmentService = await AppointmentService.findOne({ where: { id } });
        res.status(200).json({ message: "Appointment service updated successfully", data: updatedAppointmentService });
    } catch (error) {
        console.log("🚀 ~ updateAppointmentService ~ error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteAppointmentService = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await AppointmentService.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ message: 'Appointment service not found' });
        }

        res.status(200).json({ message: "Appointment service deleted successfully" });
    } catch (error) {
        console.log("🚀 ~ deleteAppointmentService ~ error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getServicesByAppointmentId = async (req, res) => {
  const { id } = req.params;

  try {
    const services = await AppointmentService.findAll({
      where: { appointment_id: id },
      include: [{ model: Service, as: 'service' }]
    });

    if (!services.length) {
      return res
        .status(404)
        .json({ message: "No services found for this appointment. Please add some first." });
    }

    res.status(200).json(services);
  } catch (error) {
    console.log("🚀 ~ getServicesByAppointmentId ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports.appointmentController = { createAppointment,getServicesByAppointmentId, getAppointmentsByPatientId, cancelAppointment, getAllAppointment, createAppointmentService, getAppointmentServices, getAppointmentServiceById, updateAppointmentService, deleteAppointmentService };
