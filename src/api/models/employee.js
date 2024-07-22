const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      name: {
        type: String,
        requierd: true,
        trim: true,
        minlength: 3,
        maxlength: 15,
      },
      surname: {
        type: String,
        requierd: true,
        trim: true,
        minlength: 3,
        maxlength: 25,
      },
    },
    age: { type: Number, required: true, min: 18, max: 65 },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    job: {
      type: String,
      required: true,
      enum: [
        "Software Developer",
        "Web Developer",
        "Data Scientist",
        "Data Analyst",
        "Systems Administrator",
        "Network Engineer",
        "Cloud Engineer",
        "Cybersecurity Specialist",
        "Information Security Analyst",
        "Project Manager",
        "Product Manager",
        "IoT Engineer",
        "UX/UI Designer",
      ],
    },
  },
  {
    timestamps: true,
    collection: "employees",
  }
);

const Employee = mongoose.model("employees", employeeSchema, "employees");

module.exports = Employee;
