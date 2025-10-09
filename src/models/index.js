const Sequelize = require('sequelize');
const PatientModal = require('./patient');
const DoctorModal = require('./doctor');
const ServiceModal = require('./services');
const AppointmentModal = require('./appointment');
const BillModal = require('./bills')
const BillItemModal = require('./billItem')
const AppointmentServiceModal = require('./appointmentService')

const sequelize = new Sequelize(process.env.DATABASE_URL , {
    dialect: 'postgres',
    logging: false   // Optional: enable for SQL debugging
})

const Patient = PatientModal(sequelize, Sequelize.DataTypes);
const Doctor = DoctorModal(sequelize, Sequelize.DataTypes);
const Service = ServiceModal(sequelize, Sequelize.DataTypes);
const Appointment = AppointmentModal(sequelize, Sequelize.DataTypes);
const Bill = BillModal(sequelize, Sequelize.DataTypes);
const BillItem = BillItemModal(sequelize, Sequelize.DataTypes);
const AppointmentService = AppointmentServiceModal(sequelize, Sequelize.DataTypes);

const setAssociations = () => {


    //Patient
    Patient.hasMany(Appointment, {
        foreignKey:'patient_id' , as: 'appointments'
    });


    Patient.hasMany(Bill, {
        foreignKey: 'patient_id' , as: 'bills'
    });


    //Doctor

    Doctor.hasMany(Appointment, {
        foreignKey: 'doctor_id', as: 'appointments'
    });



    //Appointment

    Appointment.belongsTo(Patient, {
        foreignKey:'patient_id', as: 'patient'
    })

    Appointment.belongsTo(Doctor, {
        foreignKey: 'doctor_id', as: 'doctor'
    });

    Appointment.hasOne(Bill, {
        foreignKey: 'appointment_id', as : 'bill'
    });

    Appointment.hasMany(AppointmentService, {
        foreignKey: 'appointment_id', as: 'services'
    });

    //AppointmentService
    AppointmentService.belongsTo(Appointment, {
        foreignKey: 'appointment_id', as: 'appointment'
    });

    AppointmentService.belongsTo(Service, {
        foreignKey: 'service_id', as: 'service'
    });

    //Bill

    Bill.hasMany(BillItem, {
        foreignKey: 'bill_id', as : 'items'
    });

    Bill.belongsTo(Appointment, {
        foreignKey: 'appointment_id' , as : 'appointment'
    });

    Bill.belongsTo(Patient, {
       foreignKey: 'patient_id' , as: 'patient' 
    })

    //Bills Items

    BillItem.belongsTo(Bill, {
        foreignKey: 'bill_id', as: 'bill'
    })

    BillItem.belongsTo(Service , {
        foreignKey: 'service_id', as: 'service'
    })

    //service
    Service.hasMany(BillItem, {
        foreignKey: 'service_id' , as : 'billItems'
    });

    Service.hasMany(AppointmentService, {
        foreignKey: 'service_id', as: 'appointmentServices'
    });



}

setAssociations();

module.exports = { sequelize, Patient, Doctor, Service, Appointment, Bill, BillItem, AppointmentService };
