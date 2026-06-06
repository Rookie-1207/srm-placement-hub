const express = require("express");
const {
  createCompany,
  getCompanies,
} = require("../controllers/companyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCompany);
router.get("/", protect, getCompanies);

module.exports = router;