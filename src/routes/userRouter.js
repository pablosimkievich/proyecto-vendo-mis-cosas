const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


// ? Lista de Usuarios
router.get('/usuarios', userController.userList)

// ? Perfil de Usuario
router.get('/usuarios/:id', userController.userProfile)


router.get('/login', userController.loginForm)

module.exports = router