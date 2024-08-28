const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const validateRegister = require('../middlewares/registerFormValidation.js')
const validateLogin = require('../middlewares/loginFormValidation.js')


// ? Lista de Usuarios
router.get('/usuarios', userController.userList)

// ? Perfil de Usuario
router.get('/usuarios/:id', userController.userProfile)


router.get('/register', userController.registerForm)
router.post('/register', validateRegister, userController.registerProcess)


router.get('/login', userController.loginForm)
router.post('/login', validateLogin, userController.loginProcess)


router.get('/usuarios/:id/actualizar-usuario', userController.updateUserForm)


router.get('/usuarios/:id/review', userController.reviewUserForm)

module.exports = router