const logo = require('asciiart-logo');
const inquirer = require("inquirer");
const db = require('./db');
require('console.table');
const { allDept, allRole, allEmployee } = require('./db/index')

const { connection } = require("./db/connection");

options();

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
                'Update an Employee\'s Role'
            ]
        },    
    ]).then(res => {
        switch (res.selectType) {
            case "View All Departments": allDept();
                break;
            case "View All Roles": allRole();
                break;
            case "View All Employees": allEmployee();
                break;
            default: 0;
        }
    });
};


