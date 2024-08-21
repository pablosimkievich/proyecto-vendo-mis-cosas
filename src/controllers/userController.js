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
                    association: 'vendor_user_reviews'
                },
                {
                    association: 'buyer_user_reviews'
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

const registerForm = (req, res) => {
    res.render('user/registerForm')
}

const registerProcess = (req, res) => {
    console.log("Soy Register Process")
}


const updateUserForm = (req, res) => {
    res.render('user/updateUserForm')
}


const loginForm = (req, res) => {
    res.render('user/loginForm') 
}

const reviewUserForm = (req, res) => {
    res.render('user/reviewUserForm')
}

module.exports = {
    userList,
    userProfile,
    registerForm,
    registerProcess,
    updateUserForm,
    reviewUserForm,
    loginForm,
}