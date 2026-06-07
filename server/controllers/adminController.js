const Company = require("../models/Company");

const addCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { addCompany };