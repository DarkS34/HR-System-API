const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    employees: [{ type: mongoose.Types.ObjectId, ref: "employees" }],
  },
  {
    timestamps: true,
    collection: "departments",
  }
);

const Department = mongoose.model(
  "departments",
  departmentSchema,
  "departments"
);

module.exports = Department;
