const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classDataSchema = new Schema(
  {
    class: { type: String, required: true },
    males: { type: Number, required: true },
    females: { type: Number, required: true },
    catholic_boys: { type: Number, required: true },
    muslim_boys: { type: Number, required: true },
    catholic_girls: { type: Number, required: true },
    muslim_girls: { type: Number, required: true },
    christian_boys: { type: Number, required: true },
    christian_girls: { type: Number, required: true },
    males_on_scholarship: { type: Number, required: true },
    females_on_scholarship: { type: Number, required: true },
    school_fees_paid: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("classData", classDataSchema);
