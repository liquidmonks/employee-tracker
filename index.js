// Dependencies
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const dotenv = require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.DB_PASS,
    database: process.env.DB,
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

/*START:**********************DEPARTMENT BLOCK************************/
// Function to view all departments
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          start();
        }
      );
    });
}
// //
// Function to delete a department
function deleteDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department you would like to delete?",
      },
    ])
    .then(function (answer) {
      db.query(
        "DELETE FROM department WHERE ?",
        {
          name: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was deleted successfully!");
          start();
        }
      );
    });
}

// Function to view utilized budget of a department
function viewBudget() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answer) {
      db.query(
        "SELECT SUM(salary) AS utilized_budget FROM role WHERE department_id = ?",
        {
          name: answer.department,
        },
        function (err, results) {
          if (err) throw err;
          console.table(results);
          start();
        }
      );
    });
}
/***********************DEPARTMENT BLOCK************************:END*/

/*START:**********************ROLE BLOCK************************/

// Function to view all roles
function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
} // end of viewRoles function

// Function to add a role to the role table
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role you would like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role you would like to add?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department id of the role you would like to add?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was created successfully!");
          start();
        }
      );
    });
} // end of addRole function

// Function to delete a role from the role table
function deleteRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role you would like to delete?",
      },
    ])
    .then(function (answer) {
      db.query(
        "DELETE FROM role WHERE ?",
        {
          title: answer.title,
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was deleted successfully!");
          start();
        }
      );
    });
} // end of deleteRole function

/***********************ROLE BLOCK************************:END*/

/*START:**********************EMPLOYEE BLOCK************************/

// Function to view all employees
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
} // end of viewEmployees function

// Function to view all employees by department
function viewEmployeesByDepartment() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
} // end of viewEmployeesByDepartment function
