const db = require('../database/models/index')

const index = async (req, res) => {
    try {

        const getAllCategories = await db.Category.findAll()

        res.render('home', { getAllCategories })

    } catch(error) {
        console.log(error)
    }
}

const aboutUs = (req, res) => {

    res.render('acercaDeNosotros')
}

const fAQ = (req, res) => {
    res.render('preguntasFrecuentes')
}

const contactForm = (req, res) => {
    res.render('contacto')
}


module.exports = {
    index,
    aboutUs,
    fAQ,
    contactForm
}