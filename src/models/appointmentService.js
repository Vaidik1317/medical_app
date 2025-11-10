module.exports = (sequelize, DataTypes) => {
    const AppointmentService = sequelize.define('AppointmentService', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        appointment_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        doctor_service_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        general_service_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        tableName: 'appointment_services',
        timestamps: false
    });

    return AppointmentService;
};
