const { body } = require('express-validator')

validateRegister = [
    body('user_name')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido').bail()
        .isLength( {min: 3} ).withMessage('Tu nombre debe tener al menos 3 caracteres').bail()
        .escape(),
    body('user_email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        .escape(),
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength( {min: 8} ).withMessage('La contraseña debe tener 8 caracteres mínimo').bail()
        .escape(),
    body('sales_description')
        .optional()
        .isString()
        .escape()
        .bail()
]

module.exports = validateRegister