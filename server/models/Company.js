const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    package: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    minimumCGPA: {
      type: Number,
      required: true,
    },

    eligibleBranches: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);