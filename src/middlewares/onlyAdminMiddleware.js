
// ? Este middleware, en caso de que un usuario no logueado quiera entrar a las páginas del admin, es 
// ? redirijido a home. En caso de estar logueado pero no ser admin, también es redirijido a home.

function onlyAdminMiddleware (req, res, next) {
    if (!req.session.userLogged) {
      return res.redirect('/')
      
  } else if (req.session.userLogged.user_type_fk_id !== 2){ // ? user_type_fk_id == 2 // es el admin
      return res.redirect('/')
  } 

  next();
};

module.exports = onlyAdminMiddleware;