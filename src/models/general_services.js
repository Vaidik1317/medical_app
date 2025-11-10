const { UUID } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const GeneralService = sequelize.define("GeneralService", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull : false
    },

    cost: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    category: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, 
  {
    tableName: 'general_services',
        timestamps: false,
  }


);

return GeneralService;
};
