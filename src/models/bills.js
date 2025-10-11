module.exports =(sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        appointment_id: {
            type: DataTypes.UUID,
            allowNull:false
        },
           patient_id: {        
        type: DataTypes.UUID,
        allowNull: false
    },
        total_amount : {
            type: DataTypes.DECIMAL(12,2),
            allowNull:false,
            defaultValue: 0,
        },
        tax: {
            type: DataTypes.DECIMAL(12,2),
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.DECIMAL(12,2),
            defaultValue: 0,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    }, 
    {
        tableName: 'bills',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }

)

return Bill

}
