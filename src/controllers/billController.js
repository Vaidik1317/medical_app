const { sequelize, Bill, BillItem, Appointment } = require('../models');

// generate bill
const generateBill = async (req, res) => {
  try { 
    let { appointment_id, service_ids, quantities } = req.body;

    if (!Array.isArray(service_ids)) service_ids = [service_ids];
    if (!Array.isArray(quantities)) quantities = [quantities];

    const service_ids_literal = `{${service_ids.join(",")}}`;
    const quantities_literal = `{${quantities.join(",")}}`;

    await sequelize.query(
      `CALL generate_bill(:appointment_id, :service_ids, :quantities);`,
      {
        replacements: { appointment_id, service_ids: service_ids_literal, quantities: quantities_literal }
      }
    );

    res.status(201).json({ message: "Bill generated successfully" });
  } catch (error) {
    console.log("🚀 ~ generateBill ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// make bill paid
const makeBillPaid = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query(`CALL mark_bill_paid(:id);`, { replacements: { id } });
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
          include: ['service']  // BillItem -> Service
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
        { model: BillItem, as: 'items', include: ['service'] },
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
    const bills = await Bill.findAll({
      where: { patient_id: patientId },
      include: [
        { model: BillItem, as: 'items', include: ['service'] },
        { model: Appointment, as: 'appointment', include: ['doctor'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(bills);
  } catch (error) {
    console.log("🚀 ~ getPatientBills ~ error:", error);
    res.status(500).json({ message: "something went wrong" });
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
