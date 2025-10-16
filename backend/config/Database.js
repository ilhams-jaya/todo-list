import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_SSL = String(process.env.DB_SSL || '').toLowerCase() === 'true';

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
    throw new Error("Database env vars missing: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST must be set");
}

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