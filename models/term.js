const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const termSchema = new Schema(
  {
    term_no: { type: String, required: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "classData" }],
    staffData: { type: mongoose.Schema.Types.ObjectId, ref: "StaffData" },
    staffList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }]
  },
  { timestamps: true }
);

termSchema.pre("deleteOne", { document: true }, async function (next) {
  await mongoose.model("classData").deleteMany({ _id: { $in: this.classes } });
  await mongoose.model("Staff").deleteMany({ _id: { $in: this.staffList } });
  if (this.staffData) {
    await mongoose.model("StaffData").deleteOne({ _id: this.staffData });
  }
  next();
});
module.exports = mongoose.model("Term", termSchema);
