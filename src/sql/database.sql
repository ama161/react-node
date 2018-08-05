-- mysql -u root -p
CREATE DATABASE tfg;

USE tfg;

CREATE TABLE CENTER(
    id_center INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE CLASS(
    id_class INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50)
);

CREATE TABLE USER(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    id_center INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100),
    data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_center) REFERENCES CENTER(id_center)
);

CREATE TABLE STUDENT(
    id_student INT PRIMARY KEY, 
    id_class INT NOT NULL,
    username VARCHAR(100),
    icon VARCHAR(50),
    FOREIGN KEY (id_student) REFERENCES USER(id_user),
    FOREIGN KEY (id_class) REFERENCES CLASS(id_class)
);

CREATE TABLE ADMINISTRATOR(
    id_admin INT PRIMARY KEY, 
    FOREIGN KEY (id_admin) REFERENCES USER(id_user)
);

CREATE TABLE PARENT(
    id_parent INT PRIMARY KEY, 
    phone VARCHAR(20),
    FOREIGN KEY (id_parent) REFERENCES USER(id_user)
);

CREATE TABLE STUDENT_PARENT(
    id_student INT,
    id_parent  INT,
    PRIMARY KEY (id_student, id_parent),
    FOREIGN KEY (id_student)  REFERENCES STUDENT(id_student),
    FOREIGN KEY (id_parent) REFERENCES PARENT(id_parent)
);

CREATE TABLE TEACHER(
    id_teacher INT PRIMARY KEY, 
    name VARCHAR(100),    
    FOREIGN KEY (id_teacher) REFERENCES USER(id_user)
);

CREATE TABLE CLASS_TEACHER(
    id_class INT,
    id_teacher  INT,
    PRIMARY KEY (id_class, id_teacher),
    FOREIGN KEY (id_class)  REFERENCES CLASS(id_class),
    FOREIGN KEY (id_teacher) REFERENCES TEACHER(id_teacher)
);

DESCRIBE users;

SELECT * FROM users;

-- CREATE TABLE users(
--     id_users INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     username VARCHAR(100),
--     email VARCHAR(100) NOT NULL UNIQUE,
--     role VARCHAR(50) NOT NULL,
--     password VARCHAR(100),
--     icon VARCHAR(50),
--     data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
 
-- CREATE TABLE class(
--     id_class INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(100) NOT NULL,
--     icon VARCHAR(50)
-- );

-- delete from USER, PARENT where id_user = '21' and id_parent = '21';

ALTER TABLE PARENT ADD phone VARCHAR(100);