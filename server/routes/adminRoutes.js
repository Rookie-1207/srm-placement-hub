const express = require("express");
const router = express.Router();

const { addCompany } = require("../controllers/adminController");

router.post("/company", addCompany);

module.exports = router;