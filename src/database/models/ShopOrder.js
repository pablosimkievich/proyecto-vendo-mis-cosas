const OrderDetail = require("./OrderDetail");

module.exports = (sequelize, dataTypes) => {
    const ShopOrder = sequelize.define('ShopOrder', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vendor_user_fk_id: {
            type: dataTypes.INTEGER
        },
        order_total_amt: {
            type: dataTypes.DECIMAL
        },
        order_date: {
            type: dataTypes.DATE
        },
        order_status: {
            type: dataTypes.STRING
        },
        order_address: {
            type: dataTypes.STRING
        },
        pay_method_fk_id: {
            type: dataTypes.INTEGER
        },
        buyer_user_fk_id: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'shop_orders',
        timestamps: false
    });
    ShopOrder.associate = (models) => {
        ShopOrder.belongsTo(models.PaymentMethod, {
            as: 'payment_methods',
            foreignKey: 'pay_method_fk_id'
        })
        ShopOrder.hasMany(models.OrderDetail, {
            as: 'order_details',
            foreignKey: 'order_fk_id'
        })
        ShopOrder.belongsTo(models.User, {
            as: 'vendor_users',
            foreignKey: 'vendor_user_fk_id'
        })
        ShopOrder.belongsTo(models.User, {
            as: 'buyer_users',
            foreignKey: 'buyer_user_fk_id'
        })
    }
    return ShopOrder
}