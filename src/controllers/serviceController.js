const { DoctorService, GeneralService, Doctor } = require('../models');

// ===================== Doctor Services =====================

// 🩺 Create a new doctor-specific service
const createDoctorService = async (req, res) => {
  try {
    const { doctor_id, name, cost } = req.body;
    console.log("🚀 ~ createDoctorService ~ doctor_id, name, cost:", doctor_id, name, cost);

    // ✅ fix falsy cost check (0 should be allowed)
    if (!doctor_id?.trim() || !name?.trim() || cost === null || cost === undefined) {
      return res.status(400).json({ message: "doctor_id, name, and cost are required" });
    }

    // ✅ ensure doctor exists
    const doctor = await Doctor.findByPk(doctor_id);
    console.log("🚀 ~ createDoctorService ~ doctor:", doctor);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // ✅ create new service
    const service = await DoctorService.create({ doctor_id, name, cost });
    return res.status(201).json(service);
    
  } catch (error) {
    console.log("🚀 ~ createDoctorService ~ error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

console.log("🚀 ~ createDoctorService ~ createDoctorService:", createDoctorService)
console.log("🚀 ~ createDoctorService ~ createDoctorService:", createDoctorService)

// 🩺 Get all services for a specific doctor
const getDoctorServices = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const services = await DoctorService.findAll({
      where: { doctor_id: doctorId },
      order: [["name", "ASC"]],
    });

    res.status(200).json(services);
  } catch (error) {
    console.log("🚀 ~ getDoctorServices ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 🩺 Get all doctor services (across all doctors)
const getAllDoctorServices = async (req, res) => {
  try {
    const services = await DoctorService.findAll({
      include: [{ model: Doctor, as: 'doctor' }],
      order: [["name", "ASC"]],
    });

    res.status(200).json(services);
  } catch (error) {
    console.log("🚀 ~ getAllDoctorServices ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



// 🩺 Update a doctor-specific service
const updateDoctorService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cost } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await DoctorService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Doctor service not found" });
    }

    // Update only provided fields
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (cost !== undefined) updates.cost = cost;

    await service.update(updates);
    res.status(200).json(service);
  } catch (error) {
    console.log("🚀 ~ updateDoctorService ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 🩺 Delete a doctor-specific service
const deleteDoctorService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await DoctorService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Doctor service not found" });
    }

    await service.destroy();
    res.status(200).json({ message: "Doctor service deleted successfully" });
  } catch (error) {
    console.log("🚀 ~ deleteDoctorService ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ===================== General Services =====================

// 🏥 Create a new general service (like MRI, X-Ray)
const createGeneralService = async (req, res) => {
  try {
    const { name, cost , category } = req.body;

    if (!name || !cost) {
      return res.status(400).json({ message: "name and cost are required" });
    }

    const service = await GeneralService.create({ name, cost, category });
    res.status(201).json(service);
  } catch (error) {
    console.log("🚀 ~ createGeneralService ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 🏥 Get all general services
const getAllGeneralServices = async (req, res) => {
  try {
    const services = await GeneralService.findAll({ order: [["name", "ASC"]] });
    res.status(200).json(services);
  } catch (error) {
    console.log("🚀 ~ getAllGeneralServices ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 🏥 Update a general service
const updateGeneralService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cost, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await GeneralService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "General service not found" });
    }

    // Update only provided fields
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (cost !== undefined) updates.cost = cost;
    if (category !== undefined) updates.category = category;

    await service.update(updates);
    res.status(200).json(service);
  } catch (error) {
    console.log("🚀 ~ updateGeneralService ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 🏥 Delete a general service
const deleteGeneralService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await GeneralService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "General service not found" });
    }

    await service.destroy();
    res.status(200).json({ message: "General service deleted successfully" });
  } catch (error) {
    console.log("🚀 ~ deleteGeneralService ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ===================== Combined (for patient view) =====================

// 👩‍⚕️ Get all available services for a given doctor (doctor-specific + general)
const getAvailableServicesForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorServices = await DoctorService.findAll({ where: { doctor_id: doctorId } });
    const generalServices = await GeneralService.findAll();

    res.status(200).json({
      doctor_services: doctorServices,
      general_services: generalServices,
    });
  } catch (error) {
    console.log("🚀 ~ getAvailableServicesForDoctor ~ error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.serviceController = {
  createDoctorService,
  getDoctorServices,
  getAllDoctorServices,
  updateDoctorService,
  deleteDoctorService,
  createGeneralService,
  getAllGeneralServices,
  updateGeneralService,
  deleteGeneralService,
  getAvailableServicesForDoctor,
};
 