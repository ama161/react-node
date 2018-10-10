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
    name VARCHAR(100),
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
 
CREATE TABLE SUBJECT(
    id_subject INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    icon VARCHAR(50)
);

CREATE TABLE DOSSIER(
    id_student INT,
    id_teacher INT,
    title VARCHAR(100),
    note FLOAT,
    id_subject INT,
    PRIMARY KEY (id_student, id_teacher, title, id_subject),
    FOREIGN KEY (id_student) REFERENCES STUDENT(id_student),
    FOREIGN KEY (id_teacher) REFERENCES TEACHER(id_teacher),
    FOREIGN KEY (id_subject) REFERENCES SUBJECT(id_subject)
);

CREATE TABLE TEST(
    id_test INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    description VARCHAR(100)
);

CREATE TABLE QUESTION(
    id_question INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    response_true VARCHAR(100),
    response_false_1 VARCHAR(100),
    response_false_2 VARCHAR(100),
    id_subject INT,
    FOREIGN KEY (id_subject) REFERENCES SUBJECT(id_subject)
);

CREATE TABLE TEST_QUESTION(
    id_test INT,
    id_question INT,
    PRIMARY KEY (id_test, id_question),
    FOREIGN KEY (id_test) REFERENCES TEST(id_test),
    FOREIGN KEY (id_question) REFERENCES QUESTION(id_question)
);
 
CREATE TABLE CLASS_TEST(
    id_class INT,
    id_test INT,
    PRIMARY KEY (id_class, id_test),
    FOREIGN KEY (id_class) REFERENCES CLASS(id_class),    
    FOREIGN KEY (id_test) REFERENCES TEST(id_test)
);

CREATE TABLE STUDENT_TEST(
    id_student INT,
    id_test INT,
    note VARCHAR(50),
    PRIMARY KEY (id_student, id_test),
    FOREIGN KEY (id_student) REFERENCES STUDENT(id_student),    
    FOREIGN KEY (id_test) REFERENCES TEST(id_test)
);

CREATE TABLE CALENDAR_ASSISTANCE(
    id_student INT,
    id_subject INT,
    id_class INT,
    date VARCHAR(50),
    description VARCHAR(100),
    type VARCHAR(50),
    PRIMARY KEY (description, id_class, date),
    FOREIGN KEY (id_student) REFERENCES STUDENT(id_student),
    FOREIGN KEY (id_class) REFERENCES CLASS(id_class),
    FOREIGN KEY (id_subject) REFERENCES SUBJECT(id_subject)
);

CREATE TABLE NOTIFICATIONS(
    id_student INT,
    description VARCHAR(50),
    PRIMARY KEY (description, id_student),
    FOREIGN KEY (id_student) REFERENCES STUDENT(id_student)
);

CREATE TABLE DAY(
    id_day INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(100)
);

INSERT INTO DAY (label) VALUES ('LUNES'), ('MARTES'), ('MIERCOLES'), ('JUEVES'), ('VIERNES');

CREATE TABLE TIME(
    id_time INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(100)
);

INSERT INTO TIME (label) VALUES ('09:00'), ('10:00'), ('11:00'), ('12:00'), ('13:00'), ('14:00'), ('15:00'), ('16:00'), ('17:00');

CREATE TABLE CALENDAR_WEEK(
    id_class INT,
    id_day INT,
    id_time INT,
    id_subject INT,
    PRIMARY KEY (id_class, id_day, id_time),
    FOREIGN KEY (id_class) REFERENCES CLASS(id_class),
    FOREIGN KEY (id_day) REFERENCES DAY(id_day),
    FOREIGN KEY (id_time) REFERENCES TIME(id_time),
    FOREIGN KEY (id_subject) REFERENCES SUBJECT(id_subject)
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
ALTER TABLE PARENT ADD name VARCHAR(50);
ALTER TABLE DOSSIER ADD subject VARCHAR(50);

ALTER TABLE DOSSIER ADD PRIMARY KEY (id_student, id_teacher, title, id_subject);