import Todo from "../models/TodoModel.js";

export const getTodos = async(req, res) => {
    try {
        const response = await Todo.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal Server Error", error: error.message});
    }
}

export const getTodoById = async(req, res) => {
    try {
        const response = await Todo.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if (!response) {
            return res.status(404).json({msg: "Todo not found"});
        }
        
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal Server Error", error: error.message});
    }
}

export const createTodo = async(req, res) => {
    try {
        const { title, deadline, completed } = req.body;
        
        if (!title || !deadline) {
            return res.status(400).json({msg: "Title and deadline are required"});
        }
        
        await Todo.create(req.body);
        res.status(201).json({msg: "To-do Created Successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal Server Error", error: error.message});
    }
}

export const updateTodo = async(req, res) => {
    try {
        const [rowsAffected] = await Todo.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        
        if (rowsAffected === 0) {
            return res.status(404).json({msg: "Todo not found"});
        }
        
        res.status(200).json({msg: "To-do Updated Successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal Server Error", error: error.message});
    }
}

export const deleteTodo = async(req, res) => {
    try {
        const rowsAffected = await Todo.destroy({
            where: {
                id: req.params.id
            }
        });
        
        if (rowsAffected === 0) {
            return res.status(404).json({msg: "Todo not found"});
        }
        
        res.status(200).json({msg: "To-do Deleted Successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal Server Error", error: error.message});
    }
}