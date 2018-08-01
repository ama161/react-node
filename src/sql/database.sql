CREATE DATABASE tfg;

USE tfg;

CREATE TABLE users(
    id_users INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100),
    role VARCHAR(50),
    password VARCHAR(100),
    data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;

INSERT INTO users(username, email, password) values('andrea', 'andreita-ama@hotmail.com', 'andrea');

SELECT * FROM users;