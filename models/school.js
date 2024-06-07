const mongoose = require("mongoose");
const Session = require("./session");

const Schema = mongoose.Schema;

const schoolSchema = new Schema(
  {
    name: { type: String, required: true },
    localGovernmentCouncil: { type: String, required: true },
    location: { type: String, required: true },
    administratorName: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    foundingYear: { type: Number, required: true },
    educationLevels: { type: String, required: true },
    studentBoarding: { type: Boolean, required: true },
    pta: { type: String, required: true },
    latestDateOfInspection: { type: Date, required: true },
    securityGuard: { type: Boolean, required: false, default: false }
  },
  { timestamps: true }
);

schoolSchema.pre("deleteOne", { document: true }, async function (next) {
  const sessions = await Session.find({ schoolId: this._id });
  for (const session of sessions) {
    await session.deleteOne();
  }
  next();
});

module.exports = mongoose.model("School", schoolSchema);
