// Import Express Instance
const express = require('express');

// Import Controllers

const authController = require('../controllers/authController')

// Import Middleware
const { verifyToken } = require('../middlewares/auth')

const router = express.Router()


//Routes - Professor

router.post('/professor/register', authController.createProfessor)

router.post('/professor/login', authController.loginProfessor)

// Export Module
module.exports = router;