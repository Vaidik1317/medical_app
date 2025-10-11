module.exports =(sequelize , DataTypes) => {

    const Doctor = sequelize.define( 'Doctor' , {
        id: {
            type: DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact: {
             type: DataTypes.STRING,
            allowNull: false
        }
    },
   {
    tableName: 'doctors',
    timestamps: false
   }
);

return Doctor

}
