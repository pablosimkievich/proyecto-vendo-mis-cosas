const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


// ? Lista de Usuarios
router.get('/usuarios', userController.userList)

// ? Perfil de Usuario
router.get('/usuarios/:id', userController.userProfile)


router.get('/register', userController.registerForm)
router.post('/register', userController.registerProcess)


router.get('/login', userController.loginForm)


router.get('/usuarios/:id/actualizar-usuario', userController.updateUserForm)


router.get('/usuarios/:id/review', userController.reviewUserForm)

module.exports = router