const Company = require("../models/Company");
const Application = require("../models/Application");

const getDashboardStats = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments();

    const totalApplications = await Application.countDocuments({
      student: req.user.id,
    });

    const applied = await Application.countDocuments({
      student: req.user.id,
      status: "Applied",
    });

    const selected = await Application.countDocuments({
      student: req.user.id,
      status: "Selected",
    });

    const rejected = await Application.countDocuments({
      student: req.user.id,
      status: "Rejected",
    });

    res.json({
      totalCompanies,
      totalApplications,
      applied,
      selected,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };