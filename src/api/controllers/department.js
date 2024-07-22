const Department = require("../models/department");
const mongoose = require("mongoose");

const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate({
      path: "employees",
      select: ["fullName", "age", "email", "job"],
    });
    return res.status(200).json(departments);
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

const getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const department = await Department.findById(id).populate({
      path: "employees",
      select: ["fullName", "age", "email", "job"],
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json(department);
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

const postDepartment = async (req, res, next) => {
  try {
    const newDepartment = new Department(req.body);
    const departmentSaved = await newDepartment.save();
    return res.status(201).json(departmentSaved);
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

const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const oldDepartment = await Department.findById(id);
    if (!oldDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    const newDepartment = new Department(req.body);
    newDepartment._id = id;
    newDepartment.employees = [
      ...oldDepartment.employees,
      ...req.body.employees,
    ];

    const departmentUpdated = await Department.findByIdAndUpdate(
      id,
      newDepartment,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(departmentUpdated);
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

const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const departmentDeleted = await Department.findByIdAndDelete(id);

    if (!departmentDeleted) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department deleted",
      element: departmentDeleted,
    });
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

module.exports = {
  getDepartments,
  getDepartmentById,
  postDepartment,
  updateDepartment,
  deleteDepartment,
};
