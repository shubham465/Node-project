const express = require('express');
const { currentUser, LoginUser, registerContact } = require('../controllers/userController');
const validateToken = require('../controllers/middleware/validateTokenHandler');
const router = express.Router();

router.post('/register', registerContact)

router.post('/login', LoginUser)

router.get('/current', validateToken, currentUser)

module.exports = router