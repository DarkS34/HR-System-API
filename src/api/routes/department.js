const {
  getDepartmentById,
  getDepartments,
  postDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department");

const departmentRouter = require("express").Router();

departmentRouter.get("/:id", getDepartmentById);
departmentRouter.get("/", getDepartments);
departmentRouter.post("/", postDepartment);
departmentRouter.put("/:id", updateDepartment);
departmentRouter.get("/:id", deleteDepartment);

module.exports = departmentRouter;
