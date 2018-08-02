-- mysql -u root -p
CREATE DATABASE tfg;

USE tfg;

CREATE TABLE users(
    id_users INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(100),
    icon VARCHAR(50),
    data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;

SELECT * FROM users;

CREATE TABLE class(
    id_class INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50)
);