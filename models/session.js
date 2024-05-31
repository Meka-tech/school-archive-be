const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session: { type: String, required: true },
  terms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Term" }],
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" }
});

sessionSchema.pre("deleteOne", { document: true }, async function (next) {
  const terms = await mongoose.model("Term").find({ _id: { $in: this.terms } });
  for (const term of terms) {
    await term.deleteOne();
  }
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
