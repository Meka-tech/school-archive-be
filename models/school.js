const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolSchema = new Schema(
  {
    name: { type: String, required: true },
    localGovernmentCouncil: { type: String, required: true },
    location: { type: String, required: true },
    administratorName: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    foundingYear: { type: Date, required: true },
    educationLevels: { type: String, required: true },
    studentBoarding: { type: Boolean, required: true },
    pta: { type: String, required: true },
    latestDateOfInspection: { type: Date, required: true },
    securityGuard: { type: Boolean, required: false, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", schoolSchema);
