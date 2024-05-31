const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffDataSchema = new Schema(
  {
    teaching_staffs: { type: Number, required: true },
    non_teaching_staffs: { type: Number, required: true },
    permanent_staffs: { type: Number, required: true },
    contract_staffs: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StaffData", staffDataSchema);
