import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Todo = db.define('todo', {
    title: DataTypes.STRING,
    deadline: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
},{
    freezeTableName:true
});

export default Todo;