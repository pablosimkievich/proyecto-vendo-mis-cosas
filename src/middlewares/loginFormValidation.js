const { body } = require('express-validator')

const validateLogin = [
    body('user_email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .isLength( {min: 8} ).withMessage('La contraseña debe tener 8 caracteres mínimo').bail(),
]

module.exports = validateLogin