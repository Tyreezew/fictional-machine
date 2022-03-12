USE employee_db;

INSERT INTO department (id, name)
VALUES
('Marketing'),
('Human Resources'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing Creative Director', 95000, 1),
('Chief Marketing Officer', 150000, 1),
('HR Director', 100000, 2),
('Recruiting Manager', 120000, 2),
('Accountant Manager', 140000, 3),
('Accountant', 110000, 3),
('Legal Team Lead', 175000, 4),
('Attorney', 139000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Mariah', 'Elba', 1, NULL),
('Lauryn', 'Perkins', 2, 4),
('Alexis', 'Scott', 3, NULL),
('Chris', 'Sims', 4, 5),
('Kevin', 'West', 5, NULL),
('Tiffany' 'Pollard', 6, 3),
('Enrique', 'Sanchez', 7, NULL),
('Angela', 'Howard', 8, 7);