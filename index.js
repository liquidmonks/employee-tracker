// Dependencies
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "changemenow",
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
  inquirer.prompt({
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
  });

  // .then(function (answer) {
  //   switch (answer.action) {
} // end of start function

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
