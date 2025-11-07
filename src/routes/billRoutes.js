const express = require('express');
const router = express.Router();
const { billController } = require('../controllers/billController');

// Generate a new bill
router.post('/bill', billController.generateBill);

// Mark a bill as paid
router.patch('/bill/:id/pay', billController.makeBillPaid);

// Update bill discount
router.patch('/bill/:id/discount', billController.updateBillDiscount);

// Get all bills
router.get('/bill', billController.getAllBills);

// Get bill by ID
router.get('/bill/:id', billController.getBillsById);

// Get all bills for a specific patient
router.get('/bill/patient/:patientId', billController.getPatientBills);

// Delete a bill
router.delete('/bill/:id', billController.deleteBill);

module.exports = router;
 