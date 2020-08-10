const logo = require('asciiart-logo');
const inquirer = require("inquirer");
// const db = require('./db');
require('console.table');
const { allDept, allRole, allEmployee, addDept, addEmployee, selectEmployee } = require('./db/index')

const { connection } = require("./db/connection");


connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    options()
});

function options() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add an Employee',
                'Update an Employee Role'
            ],
        },
    ]).then(res => {
        const { choice } = res;
        switch (choice) {
            case "View All Departments": allDept(options);
                break;
            case "View All Roles": allRole(options);
                break;
            case "View All Employees": allEmployee(options);
                break;
            case "Add a Department": addDept(options);
                break;
            case "Add an Employee": addEmployee(options);
                break;
            case "Update an Employee Role": selectEmployee(options);
                break;
            default: 0;
        }
    })
};

exports.options = options;
