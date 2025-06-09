const express = require("express");
const router = express.Router()
const {GetTodos, CreateTodo, GetTodoById, UpdateTodo, DeleteTodo} = require('../controllers/todoControllers');
const validateToken = require("../controllers/middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(GetTodos)
router.route("/").post(CreateTodo)
router.route("/:id").get(GetTodoById)
router.route("/:id").put(UpdateTodo)
router.route("/:id").delete(DeleteTodo)

module.exports = router