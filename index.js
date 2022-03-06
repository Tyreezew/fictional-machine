const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");
const promisemysql = require("promise-mysql");

startPrompt();

function startPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name:'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'View All Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
                'Update Employee Manager',
                'Delete Employee',
                'Delete Role',
                'Delete Department',
                'Quit'
                
            ]
        }
    ])
    .then((res => {
        let choice = res.choice;

        switch(choice) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees By Department":
                viewAllEmployeesByDept();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role": 
                addRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "View All Employees By Manager":
                viewAllEmployeesByManager();
                break;
            case "Add Department":
                addDeparment();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            default:
                quit();     
        }
    }))
}

function viewAllEmployees(){
    let query = "SELECT employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;"
    connection.query(query, function (err, res) {
        if(err) throw err;
        console.log("\n");
        console.table(res);

        startPrompt();
    })
};


