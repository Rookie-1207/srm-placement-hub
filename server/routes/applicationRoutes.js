const express = require("express");
const {
  createApplication,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createApplication);
router.get("/my", protect, getMyApplications);
router.patch("/:id", protect, updateApplicationStatus);

module.exports = router;