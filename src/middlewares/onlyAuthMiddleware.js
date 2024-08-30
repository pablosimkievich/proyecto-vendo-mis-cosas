/** 
 * ! este middleware redirije a /login al usuario no logueado,  en caso de que quiera entrar a su detalle
 * ! de usuario sin estar logueado. o a un formulario de  edicion de usuario.
 * ! también si el usuario logueado quiere entrar a un detalle de usuario que no es el suyo,
 * ! es redirijido a home.
 * **/


 function authMiddleware (req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/login');
    } else if (req.session.userLogged && req.session.userLogged.id != req.params.userId) {
        return res.redirect('/');
    }
    next();
};

module.exports = authMiddleware;