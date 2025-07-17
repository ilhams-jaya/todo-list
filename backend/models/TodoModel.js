import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Todo = db.define('todo', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE

},{
    freezeTableName:true
});

export default Todo;

(async()=>{
    await db.sync();
})();