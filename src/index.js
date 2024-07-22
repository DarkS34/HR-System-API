require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const employeesRouter = require("./api/routes/employee");
const departmentRouter = require("./api/routes/department");

const port = 3000;
const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/departments", departmentRouter);

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

app.listen(port, () => {
  console.log("Server: http://localhost:" + port);
});
