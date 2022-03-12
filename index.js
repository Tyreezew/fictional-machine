const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");


startPrompt();

function startPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name:'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
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
            case "View All Departments":
                viewAllDepartments();
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
            case "Add Department":
                addDepartment();
                break;
            default:
                quit();     
        }
    }))
}

    function viewAllEmployees(){
        let query = `SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;`
        connection.query(query, function (err, res) {
            if(err) throw err;
            console.log("\n");
            console.table(res);

            startPrompt();
        })
    };


    function viewAllDepartments(){
    let query = `SELECT * FROM department;`
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);

            startPrompt();
        })
    };

    function viewAllRoles() {
        let query = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`
        connection.query(query, function (err, res) {
            if(err) throw err;
            console.log("\n");
            console.table(res);

            startPrompt();
        })
    };

function addEmployee() {
    inquirer.prompt ([
    {
        name:"firstName",
        type: "input",
        message:"Enter employee's first name"
    },
    {
        name: "lastName",
        type:"input",
        message: "Enter employee's last name"
    },
    {
        name:"addRoleId",
        type:"input",
        message:"What is the role ID?"
    },
    {
        name:"addManagerId",
        type:"input",
        message:"Enter the employee's manager ID"
    }

    ])
    .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const addRoleId = res.addRoleId;
        const addManagerId = res.addManagerId;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${addRoleId}", "${addManagerId}")`
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("\n")
            console.table(res);
            startPrompt();
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "Which department would you like to add?"
        }
    ])
    .then(function (res) {
        connection.query("INSERT INTO department SET ?",
        {
            name: res.newDepartment 
        });
        let query = `SELECT * FROM department`;
        connection.query(query, function(err, res) {
            if(err) throw err;
            console.log('The department was successfully added!');
            console.table('All Departments:', res);
            startPrompt();
        })
        
    })
};

function addRole() {
    inquirer.prompt([
        {
            name:"roleTitle",
            type:"input",
            message:"Enter the name of the employee's role"
        },
        {
            name:"roleDept",
            type:"input",
            message:"Enter the department's ID"
        },
        {
            name:"roleSalary",
            type:"input",
            message:"Enter the salary of the employee"
        }
    ])
    .then(function (res) {
        const title = res.roleTitle;
        const departmentID = res.roleDept;
        const salary = res.roleSalary;
        const query = `INSERT INTO role (title, department_id, salary) VALUES("${title}", "${departmentID}", "${addRoleId}", "${salary}")`
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name:"updateEmp",
            type:"input",
            message:"Enter the employee's ID you would like updated"
        },
        {
            name:"newRole",
            type:"input",
            message:"Enter the new role ID for the employee"
        }
    ])
    .then(function (res) {
        const updateEmp = res.updateEmp;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmp}"`;
        connection.query(queryUpdate, function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        })
    })
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}