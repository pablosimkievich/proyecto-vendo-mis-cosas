const db = require('../database/models/index')

const userList = async (req, res) => {
    try {
        const allUsers = await db.User.findAll()
        res.render('user/userList', {allUsers})
    } catch(error) {
        console.log(error)
    } 
}


const userProfile = async (req, res) => {
    try {
        const id = req.params.id

        const user = await db.User.findByPk(id, {
            include: [
                {
                    association: 'user_reviews'
                },
                {
                    association: 'products'
                }
            ]
        })

        if(user) {
            res.render('user/userProfile', { user } )
        } else {
            res.send(`No existe el usuario nro. ${req.params.id}`)
        }


    } catch(error) {
        console.log(error)
    }
}


const loginForm = (req, res) => {
    res.render('user/login')
}

module.exports = {
    userList,
    userProfile,
    loginForm,
}