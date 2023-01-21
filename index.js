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
    if (err) throw err;
    console.table(results);
    // Inquires to end or re-execute program
    startOrExit();
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
          startOrExit();
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
          startOrExit();
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
    startOrExit();
  });
} // end of viewRoles function

// Function to add a role to the role table
function addRole() {
  // Select all departments and then in inquirer loop over all department names to show names.
  db.query(`SELECT DISTINCT * FROM department`, (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the title of the role you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role?",
          validate: (input) => {
            if (isNaN(input)) {
              console.log("Please enter a number!");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          name: "department",
          type: "list",
          message: "What department does the role belong to?",
          choices: () => result.map((result) => result.name),
        },
      ])
      .then(function (answers) {
        // Filter out id of that department and add to database
        const departmentID = result.filter((result) => result.name === answers.department)[0].id;
        console.log(departmentID);
        db.query(`INSERT INTO role (title,salary,department_id) VALUES ('${answers.role}','${answers.salary}','${departmentID}')`, function (err) {
          if (err) throw err;
          console.log(answers.role + " successfully add to roles under " + answers.department);
          startOrExit();
        });
      });
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
          startOrExit();
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
    startOrExit();
  });
} // end of view Employees function

// Function to view all employees by department
function viewEmployeesByDepartment() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    startOrExit();
  });
} // end of view Employees By Department function

// Function to view all employees by manager
function viewEmployeesByManager() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    startOrExit();
  });
} // end of view Employees By Manager function

// Function to add a manager
function addManager() {
  // Select titles and id of all roles and loop them to show choices
  db.query(`SELECT DISTINCT title,id FROM role`, (err, role_result) => {
    if (err) throw err;
    db.query(
      `SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
      FROM employee
      LEFT JOIN employee e
      ON employee.manager_id = e.id
      WHERE employee.manager_id IS NOT NULL`,
      (err, manager_result) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the Manager's first name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the Manager's last name?",
            },
            {
              name: "role",
              type: "list",
              message: "What is the Manager's role?",
              choices: () => role_result.map((role_result) => role_result.title),
            },
          ])
          .then(function (answers) {
            // based on option name filter out id and add to database
            const roleID = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
            db.query(`INSERT INTO employee(first_name,last_name,role_id) VALUES ('${answers.first_name}','${answers.last_name}','${roleID}');`, function (err) {
              if (err) throw err;
              console.log(answers.first_name + " " + answers.last_name + " Manager is successfully added!");
              startOrExit();
            });
          });
      }
    );
  });
} // end of addManager function

// Function to add an employee
function addEmployee() {
  // Select all roles from role tables and loop over their names in choices
  db.query(`SELECT DISTINCT title,id FROM role`, (err, role_result) => {
    if (err) throw err;
    db.query(
      `SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
      FROM employee
      LEFT JOIN employee e
      ON employee.manager_id = e.id
      WHERE employee.manager_id IS NOT NULL`,
      (err, manager_result) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "role",
              type: "list",
              message: "What is the employee's role?",
              choices: () => role_result.map((role_result) => role_result.title),
            },
            {
              name: "manager",
              type: "list",
              message: "Who is the employee's manager?",
              choices: () => manager_result.map((manager_result) => manager_result.manager_name),
            },
          ])
          .then(function (answers) {
            // Filter out role and manager id from answers and feed them in database
            const managerID = manager_result.filter((manager_result) => manager_result.manager_name === answers.manager)[0].id;
            const roleID = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
            db.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${roleID}','${managerID}');`, function (err) {
              if (err) throw err;
              console.log(answers.first_name + " " + answers.last_name + " is successfully added!");
              startOrExit();
            });
          });
      }
    );
  });
}
// end of add Employee function

// Function to delete an employee
function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you would like to delete?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you would like to delete?",
      },
    ])
    .then(function (answer) {
      db.query(
        "DELETE FROM employee WHERE ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was deleted successfully!");
          startOrExit();
        }
      );
    });
} // end of delete Employee function

// Function to update an employee's role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you would like to update?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you would like to update?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role id of the employee you would like to update?",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.role_id,
          },
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("Your employee was updated successfully!");
          startOrExit();
        }
      );
    });
} // end of update Employee Role function

// Function to update an employee's manager
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you would like to update?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you would like to update?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the manager id of the employee you would like to update?",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            manager_id: answer.manager_id,
          },
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("Your employee was updated successfully!");
          startOrExit();
        }
      );
    });
} // end of update Employee Manager function

/***********************EMPLOYEE BLOCK************************:END*/

// Exit function
const exit = () => {
  console.log("Goodbye!! See you.");
  process.exit(1);
};
// Decide whether re-execute or exit
const startOrExit = () => {
  inquirer
    .prompt([
      {
        name: "decision",
        type: "list",
        message: "Do you want to Exit?",
        choices: ["YES", "NO"],
      },
    ])
    .then((answers) => {
      if (answers.decision === "YES") {
        exit();
      } else {
        start();
      }
    });
};
