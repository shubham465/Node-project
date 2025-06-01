const express = require("express");
const router = express.Router()
const {GetContact, CreateContact, UpdateContact, DeleteContact, GetContactById} = require('../controllers/ContactControllers');
const validateToken = require("../controllers/middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(GetContact)
router.route("/").post(CreateContact)
router.route("/:id").get(GetContactById)
router.route("/:id").put(UpdateContact)
router.route("/:id").delete(DeleteContact)

module.exports = router