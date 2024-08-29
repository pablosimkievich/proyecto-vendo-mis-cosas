const { body } = require("express-validator")

const validateUserUpdate = [
    body('user_name')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido')
        .isLength({ min: 3 }).withMessage('El nombre dedbe tener al menos 3 caracteres'),
    body('user_email')
        .notEmpty().withMessage('Debes ingresar un email')
        .isEmail().withMessage('Debes igresar un email válido'),
]

module.exports = validateUserUpdate