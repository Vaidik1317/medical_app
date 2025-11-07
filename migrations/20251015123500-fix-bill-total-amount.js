'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update total_amount for existing bills based on bill_items
    await queryInterface.sequelize.query(`
      UPDATE bills
      SET total_amount = COALESCE((
        SELECT SUM(bi.quantity * s.cost)
        FROM bill_items bi
        JOIN services s ON bi.service_id = s.id
        WHERE bi.bill_id = bills.id
      ), 0)
      WHERE total_amount = 0 OR total_amount IS NULL;
    `);
  },

  async down(queryInterface, Sequelize) {
    // No down migration needed, as this is a fix
  },
};
