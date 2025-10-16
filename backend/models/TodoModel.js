import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Todo = db.define('todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// Initialize database connection and sync
const initDatabase = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Database synchronization failed:', error);
    }
};

// Only run sync in development or when explicitly called
if (process.env.NODE_ENV !== 'production') {
    initDatabase();
}

export default Todo;