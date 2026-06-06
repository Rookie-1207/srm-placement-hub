const Application = require("../models/Application");

const createApplication = async (req, res) => {
  try {
    const { company, status } = req.body;

    const application = await Application.create({
      student: req.user.id,
      company,
      status,
    });

    res.status(201).json({
      message: "Application tracked successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    }).populate("company");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.student.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    application.status = req.body.status || application.status;

    const updatedApplication = await application.save();

    res.status(200).json({
      message: "Application status updated",
      application: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getMyApplications,
  updateApplicationStatus,
};