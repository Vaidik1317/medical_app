'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const bills = await queryInterface.sequelize.query(`SELECT id FROM bills;`);
    const services = await queryInterface.sequelize.query(`SELECT id, cost FROM services;`);
    const billRows = bills[0];
    const serviceRows = services[0];

    await queryInterface.bulkInsert('bill_items', [
      {
        id: uuidv4(),
        bill_id: billRows[0].id,
        service_id: serviceRows[0].id, // General Consultation
        quantity: 1,
        unit_price: serviceRows[0].cost,
      },
      {
        id: uuidv4(),
        bill_id: billRows[0].id,
        service_id: serviceRows[1].id, // Blood Test
        quantity: 1,
        unit_price: serviceRows[1].cost,
      },
      {
        id: uuidv4(),
        bill_id: billRows[1].id,
        service_id: serviceRows[2].id, // X-Ray
        quantity: 1,
        unit_price: serviceRows[2].cost,
      },
      {
        id: uuidv4(),
        bill_id: billRows[1].id,
        service_id: serviceRows[3].id, // ECG
        quantity: 1,
        unit_price: serviceRows[3].cost,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bill_items', null, {});
  },
};
