import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const DB_NAME = process.env.DB_NAME || 'todo_list';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_SSL = String(process.env.DB_SSL || '').toLowerCase() === 'true';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectModule: mysql2,
    dialectOptions: DB_SSL ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {}
});

export default db;