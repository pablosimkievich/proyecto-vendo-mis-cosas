const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const validateRegister = require('../middlewares/registerFormValidation.js')
const validateLogin = require('../middlewares/loginFormValidation.js')
const validateUserUpdate = require('../middlewares/userUpdateValidation.js')
const onlyGuestMiddleware = require('../middlewares/onlyGuestMiddleware.js')
const onlyAuthMidleware = require('../middlewares/onlyAuthMiddleware.js')






// ? Lista de Usuarios
router.get('/usuarios', userController.userList)

// ? Perfil de Usuario
router.get('/usuarios/:id', userController.userProfile)


// ? Registro y Login y Logout
router.get('/register', onlyGuestMiddleware, userController.registerForm)
router.post('/register', validateRegister, userController.registerProcess)

router.get('/login', onlyGuestMiddleware, userController.loginForm)
router.post('/login', validateLogin, userController.loginProcess)
router.get('/logout', userController.logout)

// ? Update y Delete
router.get('/usuarios/:userId/actualizar-usuario', onlyAuthMidleware, userController.updateUserForm)
router.put('/actualizar-usuario', validateUserUpdate, userController.updateUserProcess)
router.delete('/usuarios/delete/:id', userController.userDestroy)


router.get('/usuarios/:userId/review', onlyAuthMidleware, userController.reviewUserForm)



module.exports = router