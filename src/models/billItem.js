module.exports =(sequelize, DataTypes) => {
    const BillItem = sequelize.define( 'BillItem' , {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        bill_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        doctor_service_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        general_service_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        quantity : {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },

        unit_price :{
            type: DataTypes.DECIMAL(12,2),
            allowNull: false
        }
    },
   {
    tableName: 'bill_items',
    timestamps: false
   }
)

return BillItem;
}
