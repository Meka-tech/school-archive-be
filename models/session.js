const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session: { type: String, required: true },
  terms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Term" }],
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  finance_details: [
    {
      class: { type: String, required: true },
      first_term: { type: String },
      second_term: { type: String },
      third_term: { type: String }
    }
  ]
});

module.exports = mongoose.model("Session", sessionSchema);
