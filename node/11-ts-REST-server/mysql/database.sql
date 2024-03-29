CREATE DATABASE IF NOT EXISTS NodeTypescript CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE NodeTypescript;
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    state TINYINT(4) DEFAULT 1,
    PRIMARY KEY (id)
);