const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController.js')


// ? Home
router.get('/', mainController.index)

router.get('/acerca-de-nosotros', mainController.aboutUs)
router.get('/preguntas-frecuentes', mainController.fAQ)
router.get('/contacto', mainController.contactForm)

module.exports = router