const { connection } = require("./connection");

const allDept = () => {

    connection.query('SELECT * FROM department ORDER BY id ASC;',

        function (err, res) {
            if (err) throw err;
            console.table(res);
        });
};

const allRole = () => {

    connection.query('SELECT * FROM role ORDER BY id ASC;',

        function (err, res) {
            if (err) throw err;
            console.table(res);
        });
};

const allEmployee = () => {

    connection.query('SELECT * FROM employee ORDER BY id ASC;',

        function (err, res) {
            if (err) throw err;
            console.table(res);
        });
};




module.exports = { allDept, allRole, allEmployee };