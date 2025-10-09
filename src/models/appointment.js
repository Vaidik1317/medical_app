export default (sequelize, DataTypes) => {

    const Appointment = sequelize.define( 'Appointment' , {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        patient_id: {
            type: DataTypes.UUID,
            allowNull:false

        },
        doctor_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        start_time : {
            type: DataTypes.DATE,
            allowNull: false
        }, 
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        appointments_tsrange:{
            type: DataTypes.RANGE(DataTypes.DATE),
            allowNull:false
        },
        status:{
            type: DataTypes.STRING,
            defaultValue: 'Scheduled'
        }
    },
    {
        tableName: 'appointments',
        timestamps: false
    }

)

return Appointment

}
