module.exports =(sequelize, DataTypes) => {
    const DoctorService = sequelize.define( 'DoctorService', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
         doctor_id: {
        type: DataTypes.UUID,
        allowNull: false,
       
      },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    },

    {
        tableName: 'doctor_services',
        timestamps: false
    }
)


 return DoctorService;
}
