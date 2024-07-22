const {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeesByJob,
  getEmployeesByAge,
  getEmployeesBySurname,
} = require("../controllers/employee");

const employeesRouter = require("express").Router();

employeesRouter.get("/surname/:surname", getEmployeesBySurname);
employeesRouter.get("/job/:job", getEmployeesByJob);
employeesRouter.get("/age/:age", getEmployeesByAge);
employeesRouter.get("/:id", getEmployeeById);
employeesRouter.get("/", getEmployees);
employeesRouter.post("/", postEmployee);
employeesRouter.put("/:id", updateEmployee);
employeesRouter.delete("/:id", deleteEmployee);

module.exports = employeesRouter;
