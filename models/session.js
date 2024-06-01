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

sessionSchema.pre("deleteOne", { document: true }, async function (next) {
  const terms = await mongoose.model("Term").find({ _id: { $in: this.terms } });
  for (const term of terms) {
    await term.deleteOne();
  }

  const finances = await mongoose
    .model("financeDetail")
    .find({ _id: { $in: this.finance_details } });
  for (const finance of finances) {
    await finance.deleteOne();
  }
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
