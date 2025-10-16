import { Sequelize } from "sequelize";

// Database configuration for different environments
const config = {
    development: {
        database: 'todo_list',
        username: 'root',
        password: '',
        host: 'localhost',
        dialect: 'mysql'
    },
    production: {
        database: process.env.DB_NAME || 'todo_list',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: dbConfig.logging,
    pool: dbConfig.pool
});

export default db;