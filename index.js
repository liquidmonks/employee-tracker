// Dependencies
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Siriusxm@2k22",
    database: "emp_db",
  },
  console.log(`Connected to the emp_db database.`)
);

// Start the application
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        new inquirer.Separator("********Department List********"),
        "View all departments",
        "Add a department",
        "Delete a department",
        "View utilized budget of a department",

        new inquirer.Separator("********Role List********"),
        "View all roles",
        "Add a role",
        "Delete a role",

        new inquirer.Separator("********Employee List********"),
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add an employee",
        "Add a manager",
        "Update an employee role",
        "Update an employee manager",
        "Delete an employee",

        new inquirer.Separator("********Exit********"),
        "Exit",
      ],
    })

    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "View utilized budget of a department":
          viewBudget();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add a role":
          addRole();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "View all employees by department":
          viewEmployeesByDepartment();
          break;
        case "View all employees by manager":
          viewEmployeesByManager();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a manager":
          addManager();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Update an employee manager":
          updateEmployeeManager();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "Exit":
          exit();
          break;
        default:
          console.log("Please select a valid option!");
          start();
          break;
      } // end of switch
    }); // end of then function
} // end of else function

// end of start function

// // Function to view all departments
// function viewDepartments() {
//   db.query("SELECT * FROM department", function (err, results) {
//     console.table(results);
//   });
// }

// // Function to view all roles
// inquirer
//   .prompt([
//     {
//       type: "list",
//       message: "What would you like to do?",
//       name: "choice",
//       choices: [
//         { name: "View all departments", value: "VIEW DEPARTMENTS" },
//         { name: "View all roles", value: "VIEW ROLES" },
//       ],
//     },
//   ])
//   .then((response) => {
//     if (response.choice === "VIEW DEPARTMENTS") {
//       viewDepartments();
//     }
//   });
