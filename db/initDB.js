"use strict";

require("dotenv").config();
const { getConnection } = require("./db");
const chalk = require("chalk");

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log(chalk.green("Conexión establecida"));

    //Crear BBDD
    await connection.query("CREATE DATABASE IF NOT EXISTS portalDigital");
    await connection.query("USE portalDigital");
    console.log(chalk.green("Base de datos creada"));

    //Borrar tablas
    console.log(chalk.yellow("Borrando tablas antiguas..."));
    await connection.query("DROP TABLE IF EXISTS comments;");
    await connection.query("DROP TABLE IF EXISTS requiredS;");
    await connection.query("DROP TABLE IF EXISTS users;");

    //Crear tablas
    console.log(chalk.yellow("Creando tablas nuevas..."));

    await connection.query(`
    CREATE TABLE users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      nickname VARCHAR(30) NOT NULL UNIQUE CHECK (LENGTH(nickname) >= 4),
      name VARCHAR(30),
      surname VARCHAR(60),
      password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 8 AND password REGEXP '[A-Z]' AND password REGEXP '[a-z]' AND password REGEXP '[0-9]'),
      biography VARCHAR(600),
      userPhoto VARCHAR(1000),
      linkedin VARCHAR(100) CHECK (linkedin REGEXP '^https?://(www\.)?linkedin\.com/in/[\w-]+$'),
      instagram VARCHAR(100) CHECK (instagram REGEXP '^https?://(www\.)?instagram\.com/[\w-]+igshid=[\w-]+$'),
      active BOOLEAN DEFAULT TRUE
    );
    `);

    await connection.query(`
    CREATE TABLE requiredS(
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(50) NOT NULL CHECK (LENGTH(title) >= 15),
      request_body VARCHAR(500) NOT NULL CHECK (LENGTH(request_body) >= 15),
      user_id INT NOT NULL,
      file_name VARCHAR(90),
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      required_type VARCHAR(20) NOT NULL,
      done BOOLEAN DEFAULT FALSE,
      hide BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `);

    await connection.query(`
    CREATE TABLE comments(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      requiredS_id INT NOT NULL,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      serviceFile VARCHAR(30),
      hide BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (requiredS_id) REFERENCES requiredS (id)
    );
    `);

    console.log(chalk.green("Tablas creadas con éxito"));
  } catch (error) {
    console.error(chalk.red("Hubo un error: " + error.message));
  } finally {
    if (connection) console.log(chalk.yellow("Liberando conexión..."));
    connection.release();
    console.log(chalk.green("Conexión liberada"));

    process.exit();
  }
}

main();
