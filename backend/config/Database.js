import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize('todo_list', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2
});

export default db;