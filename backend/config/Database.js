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
            max: 2, // Reduced for serverless
            min: 0,
            acquire: 10000, // Reduced timeout
            idle: 5000
        },
        dialectOptions: {
            connectTimeout: 10000,
            acquireTimeout: 10000,
            timeout: 10000,
            reconnect: true
        },
        retry: {
            max: 3
        }
    }
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create sequelize instance with proper error handling
let db;
try {
    db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        port: dbConfig.port,
        logging: dbConfig.logging || false,
        pool: dbConfig.pool,
        dialectOptions: dbConfig.dialectOptions,
        retry: dbConfig.retry,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    });
} catch (error) {
    console.error('Database configuration error:', error);
    // Create a fallback sequelize instance
    db = new Sequelize({
        dialect: 'mysql',
        logging: false
    });
}

export default db;