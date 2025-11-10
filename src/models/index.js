const Sequelize = require('sequelize');
const PatientModal = require('./patient');
const DoctorModal = require('./doctor');
const DoctorServiceModal = require('./doctor_services');
const GeneralServiceModal = require('./general_services');
const AppointmentModal = require('./appointment');
const BillModal = require('./bills');
const BillItemModal = require('./billItem');
const AppointmentServiceModal = require('./appointmentService');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // optional: enable for SQL debugging
});

// 🔹 Model Initialization
const Patient = PatientModal(sequelize, Sequelize.DataTypes);
const Doctor = DoctorModal(sequelize, Sequelize.DataTypes);
const DoctorService = DoctorServiceModal(sequelize, Sequelize.DataTypes);
const GeneralService = GeneralServiceModal(sequelize, Sequelize.DataTypes);
const Appointment = AppointmentModal(sequelize, Sequelize.DataTypes);
const Bill = BillModal(sequelize, Sequelize.DataTypes);
const BillItem = BillItemModal(sequelize, Sequelize.DataTypes);
const AppointmentService = AppointmentServiceModal(sequelize, Sequelize.DataTypes);

const setAssociations = () => {
  // 🔹 Patient relationships
  Patient.hasMany(Appointment, { foreignKey: 'patient_id', as: 'appointments' });
  Patient.hasMany(Bill, { foreignKey: 'patient_id', as: 'bills' });

  // 🔹 Doctor relationships
  Doctor.hasMany(Appointment, { foreignKey: 'doctor_id', as: 'appointments' });
  Doctor.hasMany(DoctorService, { foreignKey: 'doctor_id', as: 'services' });
  DoctorService.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
 
  // 🔹 Appointment relationships
  Appointment.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
  Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });
  Appointment.hasOne(Bill, { foreignKey: 'appointment_id', as: 'bill' });
  Appointment.hasMany(AppointmentService, { foreignKey: 'appointment_id', as: 'services' });

  // 🔹 AppointmentService relationships
  AppointmentService.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

  // Link appointment services to both possible sources:
  AppointmentService.belongsTo(DoctorService, { foreignKey: 'doctor_service_id', as: 'doctorService' });
  AppointmentService.belongsTo(GeneralService, { foreignKey: 'general_service_id', as: 'generalService' });

  // 🔹 Bill relationships
  Bill.hasMany(BillItem, { foreignKey: 'bill_id', as: 'items' });
  Bill.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
  Bill.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });

  // 🔹 BillItem relationships
  BillItem.belongsTo(Bill, { foreignKey: 'bill_id', as: 'bill' });
  BillItem.belongsTo(DoctorService, { foreignKey: 'doctor_service_id', as: 'doctorService' });
  BillItem.belongsTo(GeneralService, { foreignKey: 'general_service_id', as: 'generalService' });

  // 🔹 Services relationships
  DoctorService.hasMany(BillItem, { foreignKey: 'doctor_service_id', as: 'billItems' });
  DoctorService.hasMany(AppointmentService, { foreignKey: 'doctor_service_id', as: 'appointmentServices' });

  GeneralService.hasMany(BillItem, { foreignKey: 'general_service_id', as: 'billItems' });
  GeneralService.hasMany(AppointmentService, { foreignKey: 'general_service_id', as: 'appointmentServices' });
};

setAssociations();

module.exports = {
  sequelize,
  Patient,
  Doctor,
  DoctorService,
  GeneralService,
  Appointment,
  Bill,
  BillItem,
  AppointmentService,
};
