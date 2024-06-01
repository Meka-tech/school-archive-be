const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const financeDetailSchema = new Schema({
  name: { type: String, required: true },
  first_term: { type: String },
  second_term: { type: String },
  third_term: { type: String }
});

module.exports = mongoose.model("financeDetail", financeDetailSchema);
