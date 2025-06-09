const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModals'); 

//@desc Get All Todos
//@route GET /api/todos
const GetTodos = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.status(200).json(todos);
    } catch (err) {
        res.status(400);
        throw new Error("No todos found");
    }
});

//@desc Create Todo
//@route POST /api/todos
const CreateTodo = asyncHandler(async (req, res) => {
    const { task } = req.body;

    if (!task) {
        res.status(400);
        throw new Error("Task is required");
    }

    try {
        const todo = await Todo.create({
            task,
            userId: req.user.id
        });
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: "Unable to create todo" });
        console.log(err);
    }
});

//@desc Get Todo by ID
//@route GET /api/todos/:id
const GetTodoById = asyncHandler(async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(404);
            throw new Error("Todo not found");
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(404);
        throw new Error("Todo not found");
    }
});

//@desc Update Todo
//@route PUT /api/todos/:id
const UpdateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTodo);
});

//@desc Delete Todo
//@route DELETE /api/todos/:id
const DeleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted", todo });
});

module.exports = {
    GetTodos,
    CreateTodo,
    GetTodoById,
    UpdateTodo,
    DeleteTodo
};
