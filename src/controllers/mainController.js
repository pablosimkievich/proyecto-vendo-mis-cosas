const db = require('../database/models/index')

const index = async (req, res) => {
    try {

        const getAllCategories = await db.Category.findAll()

        res.render('home', { getAllCategories })

    } catch(error) {
        console.log(error)
    }
}



module.exports = {
    index,
}