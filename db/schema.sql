-- DROP TABLE IF EXISTS role;
-- DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS employee;
DROP DATABASE IF EXISTS database_company;

CREATE DATABASE database_company;

USE database_company;

  
CREATE TABLE department (
    -- id INTEGER PRIMARY KEY,
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    -- id INTEGER PRIMARY KEY,
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL
    -- department_id INT UNSIGNED NOT NULL,
    -- INDEX dep_ind (department_id),
    -- CONSTRAINT fk_department FOREIGN KEY (id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    -- id INTEGER PRIMARY KEY,
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    -- role_id INT UNSIGNED NOT NULL,
    -- INDEX dep_ind (role_id),
    -- CONSTRAINT fk_role FOREIGN KEY (id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER UNSIGNED
);