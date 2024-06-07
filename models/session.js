const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session: { type: String, required: true },
  terms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Term" }],
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  finance_details: [
    { type: mongoose.Schema.Types.ObjectId, ref: "financeDetail" }
  ]
});

module.exports = mongoose.model("Session", sessionSchema);
