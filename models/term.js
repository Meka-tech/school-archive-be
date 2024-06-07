const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const termSchema = new Schema(
  {
    term_no: { type: String, required: true },
    classes: [
      {
        class: { type: String },
        males: { type: Number },
        females: { type: Number },
        catholic_boys: { type: Number },
        muslim_boys: { type: Number },
        catholic_girls: { type: Number },
        muslim_girls: { type: Number },
        christian_boys: { type: Number },
        christian_girls: { type: Number },
        males_on_scholarship: { type: Number },
        females_on_scholarship: { type: Number }
        // school_fees_paid: { type: Number, required: true }
      }
    ],
    staffData: {
      teaching_staffs: { type: Number },
      non_teaching_staffs: { type: Number },
      permanent_staffs: { type: Number },
      contract_staffs: { type: Number }
    },
    staffList: [
      {
        name: { type: String },
        employment_date: { type: Date },
        academic_qualification: { type: String },
        area_of_employment: { type: String },
        salary: { type: String },
        religious_denomination: { type: String },
        gender: { type: String },
        phone: { type: String }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Term", termSchema);
