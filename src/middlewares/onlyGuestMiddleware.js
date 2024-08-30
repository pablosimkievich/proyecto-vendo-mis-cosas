const db = require('../database/models/index');
const op = db.Sequelize.Op;

/**
* ?   En caso de que el usuario este logueda, si el usuario entre a localhot:3000/login
* ? se lo redirije a su detalle de usuario. Para acceder a su detalle de usuario desde acÃ¡ hay que 
* ? buscar datos de dos tablas, User, y Order, por si el user tiene compras hechas.
**/

async function onlyGuestMiddleware (req, res, next) {
    
    if (req.session.userLogged) {
        
        const { id } = req.session.userLogged
        
        let user = await db.User.findByPk(id, {
            include: [
                {
                    association: 'products'
                },
                {
                    association: 'vendor_shop_orders'
                },
                {
                    association: 'buyer_shop_orders'
                },  
                {
                    association: 'vendor_order_details'
                },
                {
                    association: 'buyer_order_details'
                },
                {
                    association: 'vendor_user_reviews'
                },
                {
                    association: 'buyer_user_reviews'
                }
            ]
        }); 

        const shop_orders = await db.ShopOrder.findAll({
            where: {
                id: id
            }
        })

        return res.redirect('/');
    }
    next();
};

module.exports = onlyGuestMiddleware;