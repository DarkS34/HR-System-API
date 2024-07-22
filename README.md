# Project Documentation - *Human Resources System*

This project is a RESTful API built using Node.js and MongoDB. The API provides endpoints for managing employees and departments within an organization. The application uses Mongoose for data modeling and Express for handling HTTP requests.

## API Routes
### Departments

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| **GET** | /api/v1/departments | Get all departments |
| **GET** | /api/v1/departments/:id | Get department by ID |
| **POST** | /api/v1/departments | Create a new department |
| **PUT** | /api/v1/departments/:id | Update department by ID |
| **DELETE** | /api/v1/departments/:id | Delete department by ID |

### Employees

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| **GET** | /api/v1/employees | Get all employees |
| **GET** | /api/v1/employees/:id | Get employee by ID |
| **GET** | /api/v1/employees/surname/:surname | Get employees by surname |
| **GET** | /api/v1/employees/job/:job | Get employees by job |
| **GET** | /api/v1/employees/age/:age | Get employees by age |
| **POST** | /api/v1/employees | Create a new employee |
| **PUT** | /api/v1/employees/:id | Update employee by ID |
| **DELETE** | /api/v1/employees/:id | Delete employee by ID |


## Database Population
To populate the database, you can create documents using the defined schemas and insert them into their respective collections. Ensure that the employees are added before linking them to departments.

## Error Handling
The routes include comprehensive error handling to manage various potential issues.
Error Scenarios Covered:
- **Invalid ID Format**: If the provided ID is not a valid MongoDB ObjectId, the server responds with a 400 Bad Request status and a message indicating the invalid ID format.
- **Employee (or Department) Not Found**: If no employee is found with the provided ID, the server responds with a 404 Not Found status and a message indicating that the employee was not found.
- **Cast Error**: If a casting error occurs (e.g., an invalid type is provided where a different type is expected), the server responds with a 400 Bad Request status and a detailed error message.
- **Mongo Network Error**: If a network error occurs while trying to communicate with the MongoDB server, the server responds with a 503 Service Unavailable status and a message indicating the service is unavailable.
- **Internal Server Error**: For all other unexpected errors, the server responds with a 500 Internal Server Error status and a message indicating an internal server error.