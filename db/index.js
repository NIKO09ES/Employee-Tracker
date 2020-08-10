const { connection } = require("./connection");
const { options } = require("..");
const inquirer = require("inquirer");

const allDept = (options) => {

    connection.query('SELECT * FROM department ORDER BY id ASC;',

        function (err, res) {
            if (err) throw err;
            console.table(res);
            options();
        });
};

const allRole = (options) => {

    connection.query(`SELECT 
        r.id 'Role ID', 
        r.title 'Role', 
        d.name 'Department'
        FROM
          role r JOIN department d 
          ON r.department_id = d.id
          ORDER BY r.id ASC;`,

        function (err, res) {
            if (err) throw err;
            console.table(res);
            options();
        });
};

const allEmployee = (options) => {

    connection.query(` 
    SELECT 
    e.id 'Employee ID',
    e.first_name 'Name',
    e.last_name 'Last Name',
    r.title 'Role',
    r.salary 'Salary',
    d.name 'Department'
    FROM 
    employee e
    JOIN role r
      ON r.id = e.role_id
    JOIN department d
      ON d.id = r.department_id
      ORDER BY e.id ASC;` ,

        function (err, res) {
            if (err) throw err;
            console.table(res);
            options();
        });
};

const addDept = (options) => {
    return inquirer.prompt([
        {
            type: "input",
            name: "newDept",
            message: "What is the name of the new department?",
            validate: addDeptInput => {
                if (addDeptInput) {
                    return true;
                } else {
                    console.log('Please enter your new department!');
                    return false;
                }
            }
        },
    ]).then(Dept => {
        createDept(Dept, options)
            .then(() => console.log(`added ${Dept.newDept} toth database`))
    });
};

function createDept(Dept, options) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO department SET ?', { name: Dept.newDept },

            function (err, res) {
                if (err) reject(err);
                console.table(res);
                resolve(res);
                allDept(options);
            }
        );
    })
}

const addEmployee = (options) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee last name?'
        },
        {
            type: 'list',
            name: 'role_title',
            message: 'What is the employee role?',
            choices: [
                'Sales Lead',
                'Sales Person',
                'Lead Engineer',
                'Software Engineer',
                'Accountant',
                'Legal Team Lead',
                'Director HR'
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee manager?',
            choices: [
                "Ronald Firbank",
                "Charles LeRoi",
                'Katherine Mansfield',
                'Octavia Butler',
                'Unica Zurn'
            ]
        }
    ]).then((Employee) => {
        const { firstName, lastName, role_title, manager } = Employee
        // I take some reference the code for this function from Jessica Jernigan 
        let roleTitle = role_title;
        let mgrName = manager;
        // console.log('roleName: ', roleName)
        return Promise.all([getRoleId(roleTitle), getMgrId(mgrName), Employee])
    }).then((values) => {
        // console.log(values)
        createEmployee(values, options)
    });
};

const getRoleId = (roleTitle) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id AS role_id FROM role WHERE ?',
            {
                title: roleTitle,
            },
            function (err, res) {
                if (err) reject(err);
                // console.log('res containing department_id and role_id: ', res);
                resolve(res);
            })
    })
}

// function to retrieve the manager_id
const getMgrId = (mgrName) => {
    return new Promise((resolve, reject) => {
        const [first_name, last_name] = mgrName.split(' ');
        const query = connection.query('SELECT id AS manager_id FROM employee WHERE ?',
            [
                {
                    first_name: first_name,
                },
                {
                    last_name: last_name
                }],
            function (err, res) {
                if (err) reject(err);
                // console.log('Should show an id: ', res);
                resolve(res);
            })
        // console.log(query.sql);
    })
}


function createEmployee(values, options) {
    const firstName = values[2].first_name
    const lastName = values[2].last_name
    const roleId = values[0][0].role_id
    const managerId = values[1][0].manager_id
    console.log('first_name: ', firstName, 'last_name: ', lastName, 'role_id: ', roleId, '//// manager_id: ', managerId)
    return new Promise((resolve, reject) => {

        connection.query('INSERT INTO employee SET ?',
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: managerId
            },
            function (err, res) {
                if (err) reject(err);
                console.table(res);
                resolve(res);
                allEmployee(options);
            }
        );
    })
}

const selectEmployee = (options) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'Employee',
            message: 'Who is the employee that needs the update?',
            choices: [
                'Ronald Firbank',
                'Virginia Woolf',
                'Piers Gaveston',
                'Charles LeRoi',
                'Katherine Mansfield',
                'Dora Carrington',
                'Edward Bellamy',
                'Montague Summers',
                'Octavia Butler',
                'Unica Zurn'
            ]
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the new role for the employee',
            choices: [
                'Sales Lead',
                'Sales Person',
                'Lead Engineer',
                'Software Engineer',
                'Accountant',
                'Legal Team Lead',
                'Director HR'
            ]
        }
    ]).then((newRole) => {
        const { Employee, role } = newRole
        let roleTitle = role;
        console.log(roleTitle, Employee)
        return Promise.all([getRoleId(roleTitle), newRole]);

    }).then((values) => {
        //console.log(values, 'ok')
        updateRole(values)

    })
};


function updateRole(values) {
   // var Employee = values.split(' ');
    console.log(typeof values, values[0], 'ok')
    const [first_name, last_name] = values[1].Employee.split(' ');
    const firstName = first_name; // [ TextRow { role_id: 1 } ]
    const lastName = last_name; //{ Employee: 'Charles LeRoi', role: 'Sales Lead' }
    //to access employee use: values[1].Employee 
    //this value is 'Charles LeRoi'
    const roleId = values[0][0].role_id
    console.log('first_name: ', firstName, 'last_name: ', lastName, 'role_id: ', roleId)
    
    return new Promise((resolve, reject) => {

        connection.query(`UPDATE employee
        SET role_id = ?
        WHERE first_name = ? AND last_name = ?`,
            {
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
            },
            function (err, res) {
                if (err) reject(err);
                console.table(res);
                resolve(res);
                allEmployee(options);
            }
        );
    })
}



module.exports = { allDept, allRole, allEmployee, addDept, addEmployee, selectEmployee };