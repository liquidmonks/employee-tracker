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

// Function to view all departments
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}

// Function to view all roles
inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        { name: "View all departments", value: "VIEW DEPARTMENTS" },
        { name: "View all roles", value: "VIEW ROLES" },
      ],
    },
  ])
  .then((response) => {
    if (response.choice === "VIEW DEPARTMENTS") {
      viewDepartments();
    }
  });
