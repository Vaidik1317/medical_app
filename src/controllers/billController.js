const {sequelize} = require('../config/connectDB')
const {Bill, BillItem} = require('../models')
// generate bill
const generateBill = async (req, res) => {
    try {
        const {appointment_id, service_ids, quantities} = req.body

        await sequelize.query(
            `CALL generate_bill(:appointment_id, :service_ids, :quantities);`,
            {
                replacements: {appointment_id, service_ids, quantities}
            }
        )

        res.status(201).json({message: "Bill generated successfully"})
    } catch (error) {
        console.log("🚀 ~ generateBill ~ error:", error)
          res.status(500).json({message:"something went wrong"})
    }

}


// make bill paid
const makeBillPaid = async (req, res) => {
   try {
    const {bill_id} = req.params

    await sequelize.query(`CALL mark_bill_paid(:bill_id);`,{
        replacements: {bill_id}
    })
    res.status(200).json({message: "Bill marked as paid successfully"})
   } catch (error) {
    console.log("🚀 ~ makeBillPaid ~ error:", error)
      res.status(500).json({message:"something went wrong"})
   }
}


// update bill discount
const updateBillDiscount = async(req, res) => {
    try {
        const {bill_id} = req.params;
        const {discount} = req.body;

        await sequelize.query(`CALL update_bill_discount(:bill_id, :discount);` , {
            replacements: {bill_id, discount}
        })

           res.status(200).json({message: "Bill discount updated successfully"})

    } catch (error) {
        console.log("🚀 ~ updateBillDiscount ~ error:", error)
            res.status(500).json({message:"something went wrong"})
        
    }

}

// from modal
// const {appointment_id,total_amount, tax, discount,  paid} = req.body
//get all the bills 

const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.findAll({
            include: [{ model: BillItem}],
            order: [['created_at', 'DESC']]
        })

        res.status(200).json(bills)
    } catch (error) {
        console.log("🚀 ~ getAllBills ~ error:", error)
        res.status(500).json({message:"something went wrong"})
        
    }
}


const getBillsById =  async (req, res) => {

    try {

        const {bill_id} = req.params
        const bill = await Bill.findOne({
            where: {
                id: bill_id
            },
              include: [{ model: BillItem}],
        })

         if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }


    res.status(200).json(bill)
    } catch (error) {
        console.log("🚀 ~ getBillsById ~ error:", error)
          res.status(500).json({message:"something went wrong"})
    }

}

const deleteBill = async (req, res) => {

    try {
        const {bill_id} = req.params

        const billDelete = await Bill.destroy({
                where: {
                id: bill_id
            }
        })

        
    if (!billDelete) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json({message: 'Bill deleted'})
    } catch (error) {
        console.log("🚀 ~ deleteBill ~ error:", error)
        res.status(500).json({message:"something went wrong"})
    }

}

module.exports.billController = {generateBill , makeBillPaid ,updateBillDiscount ,getAllBills, getBillsById ,deleteBill }