const { sequelize, Bill, BillItem, DoctorService, GeneralService, Appointment, Doctor, AppointmentService } = require('../models');

// generate bill
const generateBill = async (req, res) => {
  try {
    const { appointment_id } = req.body;

    // Fetch appointment to get patient_id
    const appointment = await Appointment.findByPk(appointment_id);
    console.log("🚀 ~ generateBill ~ appointment:", appointment)
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Fetch appointment services
    const appointmentServices = await AppointmentService.findAll({
      where: { appointment_id },
      include: [
        { model: DoctorService, as: 'doctorService' },
        { model: GeneralService, as: 'generalService' }
      ]
    }); 
    console.log("🚀 ~ generateBill ~ appointmentServices:", appointmentServices)

    if (appointmentServices.length === 0) {
      return res.status(400).json({ message: "No services found for this appointment" });
    }

    // Calculate total amount
    let totalAmount = 0;
    const billItems = appointmentServices.map(as => {
      const service = as.doctorService || as.generalService;
      if (!service) {
        throw new Error(`Service not found for appointment service ${as.id}`);
      }
      const subtotal = as.quantity * service.cost;
      totalAmount += subtotal;
      return {
        doctor_service_id: as.doctor_service_id,
        general_service_id: as.general_service_id,
        quantity: as.quantity,
        unit_price: service.cost,
        line_total: subtotal
      };
    });

    // Create bill
    const bill = await Bill.create({
      appointment_id,
      patient_id: appointment.patient_id,
      total_amount: totalAmount,
      tax: totalAmount * 0.05, // 5% tax
      discount: 0,
      paid: false
    });

    // Create bill items
    for (const item of billItems) {
      await BillItem.create({
        bill_id: bill.id,
        ...item
      });
    }

    res.status(201).json({
      message: "Bill generated successfully",
      bill_id: bill.id
    });
  } catch (error) {
    console.log("🚀 ~ generateBill ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// make bill paid
const makeBillPaid = async (req, res) => {
  try {
    const { id } = req.params;

    await sequelize.query(
      `CALL mark_bill_paid(:id::uuid);`,
      { replacements: { id } }
    );

    res.status(200).json({ message: "Bill marked as paid successfully" });
  } catch (error) {
    console.log("🚀 ~ makeBillPaid ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};


// update bill discount
const updateBillDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { discount } = req.body;

    await sequelize.query(`CALL update_bill_discount(:id, :discount);`, { replacements: { id, discount } });
    res.status(200).json({ message: "Bill discount updated successfully" });
  } catch (error) {
    console.log("🚀 ~ updateBillDiscount ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// get all bills
// get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({
      include: [
        {
          model: BillItem,
          as: 'items',
          include: [
            { model: DoctorService, as: 'doctorService' },
            { model: GeneralService, as: 'generalService' }
          ]
        },
        {
          model: Appointment,
          as: 'appointment',
          include: ['patient', 'doctor'] // patient comes via appointment
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(bills);
  } catch (error) {
    console.log("🚀 ~ getAllBills ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// get bill by id
const getBillsById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({
      where: { id },
      include: [
        {
          model: BillItem,
          as: 'items',
          include: [
            { model: DoctorService, as: 'doctorService' },
            { model: GeneralService, as: 'generalService' }
          ]
        },
        { model: Appointment, as: 'appointment', include: ['patient', 'doctor'] }
      ]
    }); 

    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json(bill);
  } catch (error) {
    console.log("🚀 ~ getBillsById ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// delete bill
const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const billDelete = await Bill.destroy({ where: { id } });

    if (!billDelete) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json({ message: 'Bill deleted' });
  } catch (error) {
    console.log("🚀 ~ deleteBill ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getPatientBills = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Fetch all bills for the patient
    const bills = await Bill.findAll({
      where: { patient_id: patientId },
      include: [
        {
          model: BillItem,
          as: 'items',
          include: [
            {
              model: DoctorService,
              as: 'doctorService',
              attributes: ['id', 'name', 'cost'], // only needed fields
            },
            {
              model: GeneralService,
              as: 'generalService',
              attributes: ['id', 'name', 'cost'], // only needed fields
            }
          ]
        },
        {
          model: Appointment,
          as: 'appointment',
          include: [
            {
              model: Doctor,
              as: 'doctor',
              attributes: ['id', 'name', 'specialization']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(bills);
  } catch (error) {
    console.error("🚀 ~ getPatientBills ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



module.exports.billController = {
  generateBill,
  makeBillPaid,
  updateBillDiscount,
  getAllBills,
  getBillsById,
  deleteBill,
  getPatientBills
};
