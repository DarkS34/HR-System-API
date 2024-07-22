const Employee = require("../models/employee");
const mongoose = require("mongoose");

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const getEmployeesBySurname = async (req, res, next) => {
  try {
    const { surname } = req.params;

    const employees = await Employee.find({ 'fullName.surname': surname });

    return res.status(200).json(employees);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const getEmployeesByAge = async (req, res, next) => {
  try {
    const { age } = req.params;

    const employees = await Employee.find({ age: { $gte: age } });

    return res.status(200).json(employees);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const getEmployeesByJob = async (req, res, next) => {
  try {
    const { job } = req.params;

    const employees = await Employee.find({ job });

    return res.status(200).json(employees);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const postEmployee = async (req, res, next) => {
  try {
    const newEmployee = new Employee(req.body);
    const employeeSaved = await newEmployee.save();
    return res.status(201).json(employeeSaved);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const employeeUpdated = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employeeUpdated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(employeeUpdated);
  } catch (error) {
    if (error.name === "CastError" || error.name === "ValidationError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const employeeDeleted = await Employee.findByIdAndDelete(id);

    if (!employeeDeleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee deleted",
      element: employeeDeleted,
    });
  } catch (error) {
    if (error.name === "CastError" || error.name === "ValidationError") {
      return res.status(400).json({ message: "Bad Request: " + error.message });
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json({ message: "Service Unavailable: " + error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + error.message });
    }
  }
};

module.exports = {
  getEmployees,
  getEmployeesBySurname,
  getEmployeesByAge,
  getEmployeesByJob,
  getEmployeeById,
  postEmployee,
  updateEmployee,
  deleteEmployee,
};
