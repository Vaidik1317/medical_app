'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const bills = await queryInterface.sequelize.query(`SELECT id FROM bills;`);
    const generalServices = await queryInterface.sequelize.query(`SELECT id, cost FROM general_services;`);
    const doctorServices = await queryInterface.sequelize.query(`SELECT id, cost FROM doctor_services;`);
    const billRows = bills[0];
    const generalServiceRows = generalServices[0];
    const doctorServiceRows = doctorServices[0];

    if (!billRows || billRows.length === 0) {
      throw new Error('No bills found');
    }
    if (!generalServiceRows || generalServiceRows.length === 0) {
      throw new Error('No general services found');
    }
    if (!doctorServiceRows || doctorServiceRows.length === 0) {
      throw new Error('No doctor services found');
    }

    await queryInterface.bulkInsert('bill_items', [
      {
        id: uuidv4(),
        bill_id: billRows[0].id,
        general_service_id: generalServiceRows[0].id, // General Consultation
        quantity: 1,
        unit_price: generalServiceRows[0].cost,
      },
      {
        id: uuidv4(),
        bill_id: billRows[0].id,
        general_service_id: generalServiceRows[1].id, // Blood Test
        quantity: 1,
        unit_price: generalServiceRows[1].cost,
      },
      {
        id: uuidv4(),
        bill_id: billRows[1].id,
        general_service_id: generalServiceRows[2].id, // X-Ray
        quantity: 1,
        unit_price: generalServiceRows[2].cost,
      },
      {
        id: uuidv4(),
        bill_id: billRows[1].id,
        doctor_service_id: doctorServiceRows[0].id, // Cardiac Consultation
        quantity: 1,
        unit_price: doctorServiceRows[0].cost,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bill_items', null, {});
  },
};
