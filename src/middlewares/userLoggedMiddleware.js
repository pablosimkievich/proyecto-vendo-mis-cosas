const db = require('../database/models/index')
const op = db.Sequelize.Op

async function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false

    let emailInCookie = req.cookies.userEmail

    let userFromCookie = await db.User.findOne({
        where: {
            user_email: {
                [op.like]: `${emailInCookie}`
            }
        }
    })

    if(userFromCookie) {
        req.session.userLogged = userFromCookie
    }

    if(req.session.userLogged) {
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    next()

}

module.exports = userLoggedMiddleware