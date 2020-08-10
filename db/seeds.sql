USE database_company;

INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Finance'),
  ('Engineering'),
  ('Legal'),
  ('RRHH');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Sales Person', 80000, 1),
  ('Lead Engineer', 150000, 3),
  ('Software Engineer', 70000, 3),
  ('Accountant', 120000, 2),
  ('Legal Team Lead', 90000, 4),
  ('Director HR',60000, 5);

-- AQUI VoY
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 1),
  ('Charles', 'LeRoi', 2, NULL),
  ('Katherine', 'Mansfield', 3, NULL),
  ('Dora', 'Carrington', 3, 4),
  ('Edward', 'Bellamy', 3, 4),
  ('Montague', 'Summers', 3, 4),
  ('Octavia', 'Butler', 4, NULL),
  ('Unica', 'Zurn', 5, NULL);