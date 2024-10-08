const { body } = require("express-validator")

const validateUserUpdate = [
    body('user_name')
        .notEmpty().withMessage('Debes ingresar tu nombre y apellido').bail()
        .isLength({ min: 3 }).withMessage('El nombre dedbe tener al menos 3 caracteres').bail()
        .escape(),
    body('user_email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes igresar un email válido').bail()
        .escape(),
    body('sales_description')
        .optional()
        .isString()
        .escape()
        .bail()
]

module.exports = validateUserUpdate