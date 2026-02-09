const admissionService = require("../services/admissionService");

const list = async (req, res, next) => {
  try {
    const admissions = await admissionService.listAdmissions();
    res.json(admissions);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const admission = await admissionService.createAdmission(req.body);
    res.status(201).json(admission);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const admission = await admissionService.updateAdmissionStatus(
      req.params.id,
      status
    );
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json(admission);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const admission = await admissionService.deleteAdmission(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json({ message: "Admission deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, create, updateStatus, remove };
