const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: { type: String, required: true },
  employment_date: { type: Date, required: true },
  academic_qualification: { type: String, required: true },
  area_of_employment: { type: String, required: true },
  salary: { type: String, required: true },
  religious_denomination: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model("Staff", staffSchema);
