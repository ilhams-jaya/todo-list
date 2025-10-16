import Todo, { ensureConnection } from "../models/TodoModel.js";
import db from "../config/Database.js";

const withConnection = async (operation) => {
    try {
        await ensureConnection();
        return await operation();
    } catch (error) {
        console.error('Database operation failed:', error);
        throw error;
    }
};

export const getTodos = async(req, res) => {
    try {
        const response = await withConnection(() => Todo.findAll());
        res.status(200).json(response || []);
    } catch (error) {
        console.error('getTodos error:', error.message);
        res.status(500).json({
            msg: "Internal Server Error", 
            error: process.env.NODE_ENV === 'production' ? 'Database connection failed' : error.message
        });
    }
}

export const getTodoById = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({msg: "Invalid ID parameter"});
        }

        const response = await withConnection(() => Todo.findOne({
            where: {
                id: parseInt(id)
            }
        }));
        
        if (!response) {
            return res.status(404).json({msg: "Todo not found"});
        }
        
        res.status(200).json(response);
    } catch (error) {
        console.error('getTodoById error:', error.message);
        res.status(500).json({
            msg: "Internal Server Error", 
            error: process.env.NODE_ENV === 'production' ? 'Database connection failed' : error.message
        });
    }
}

export const createTodo = async(req, res) => {
    try {
        const { title, deadline, completed = false } = req.body;
        
        if (!title || !deadline) {
            return res.status(400).json({msg: "Title and deadline are required"});
        }

        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate.getTime())) {
            return res.status(400).json({msg: "Invalid deadline format"});
        }
        
        await withConnection(() => Todo.create({
            title: title.trim(),
            deadline: deadlineDate,
            completed: Boolean(completed)
        }));
        
        res.status(201).json({msg: "To-do Created Successfully"});
    } catch (error) {
        console.error('createTodo error:', error.message);
        res.status(500).json({
            msg: "Internal Server Error", 
            error: process.env.NODE_ENV === 'production' ? 'Failed to create todo' : error.message
        });
    }
}

export const updateTodo = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, deadline, completed } = req.body;
        
        if (!id || isNaN(id)) {
            return res.status(400).json({msg: "Invalid ID parameter"});
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (deadline !== undefined) {
            const deadlineDate = new Date(deadline);
            if (isNaN(deadlineDate.getTime())) {
                return res.status(400).json({msg: "Invalid deadline format"});
            }
            updateData.deadline = deadlineDate;
        }
        if (completed !== undefined) updateData.completed = Boolean(completed);

        const [rowsAffected] = await withConnection(() => Todo.update(updateData, {
            where: {
                id: parseInt(id)
            }
        }));
        
        if (rowsAffected === 0) {
            return res.status(404).json({msg: "Todo not found"});
        }
        
        res.status(200).json({msg: "To-do Updated Successfully"});
    } catch (error) {
        console.error('updateTodo error:', error.message);
        res.status(500).json({
            msg: "Internal Server Error", 
            error: process.env.NODE_ENV === 'production' ? 'Failed to update todo' : error.message
        });
    }
}

export const deleteTodo = async(req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(id)) {
            return res.status(400).json({msg: "Invalid ID parameter"});
        }

        const rowsAffected = await withConnection(() => Todo.destroy({
            where: {
                id: parseInt(id)
            }
        }));
        
        if (rowsAffected === 0) {
            return res.status(404).json({msg: "Todo not found"});
        }
        
        res.status(200).json({msg: "To-do Deleted Successfully"});
    } catch (error) {
        console.error('deleteTodo error:', error.message);
        res.status(500).json({
            msg: "Internal Server Error", 
            error: process.env.NODE_ENV === 'production' ? 'Failed to delete todo' : error.message
        });
    }
}