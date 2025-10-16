import Todo from "../models/TodoModel.js";

export const getTodos = async(req, res) => {
    try {
        const response = await Todo.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const getTodoById = async(req, res) => {
    try {
        const response = await Todo.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const createTodo = async(req, res) => {
    try {
       await Todo.create(req.body)
        res.status(201).json({msg:"To-do Created Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTodo = async(req, res) => {
    try {
       await Todo.update(req.body,{
        where: {
            id: req.params.id
        }
       })
        res.status(200).json({msg:"To-do Updated Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteTodo = async(req, res) => {
    try {
       await Todo.destroy({
        where: {
            id: req.params.id
        }
       })
        res.status(200).json({msg:"To-do Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}