require("dotenv").config();
const mongoose = require("mongoose");
const Department = require("../../api/models/department");
const Employee = require("../../api/models/employee");
const employees = require("../../data/employees");
const departments = require("../../data/departments");

const throwNewSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    await Department.collection.drop();
    await Employee.collection.drop();
    console.log("Collections droped");
    
    await Employee.insertMany(employees)
    await Department.insertMany(departments)
    console.log("All seed elements inserted");
    
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

throwNewSeed();
