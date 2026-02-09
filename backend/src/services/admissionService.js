const Admission = require("../models/Admission");

const listAdmissions = async () => Admission.find().sort({ createdAt: -1 });

const createAdmission = async (data) => Admission.create(data);

const updateAdmissionStatus = async (id, status) =>
  Admission.findByIdAndUpdate(id, { status }, { new: true });

const deleteAdmission = async (id) => Admission.findByIdAndDelete(id);

module.exports = {
  listAdmissions,
  createAdmission,
  updateAdmissionStatus,
  deleteAdmission,
};
