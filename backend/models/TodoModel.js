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
    timestamps: false,
    tableName: 'todo'
});

export const ensureConnection = async () => {
    try {
        await db.authenticate();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
};

const initDatabase = async () => {
    try {
        await db.authenticate();
        console.log('Database connection established successfully.');
        
        if (process.env.NODE_ENV !== 'production') {
            await db.sync();
            console.log('Database synchronized successfully.');
        }
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

if (process.env.NODE_ENV !== 'production') {
    initDatabase();
}

export default Todo;