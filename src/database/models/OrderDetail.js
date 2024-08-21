module.exports = (sequelize, dataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_fk_id: {
            type: dataTypes.INTEGER
        },
        product_fk_id: {
            type: dataTypes.INTEGER
        },
        quntity: {
            type: dataTypes.INTEGER
        },
        fk_vendor_user_id: {
            type: dataTypes.INTEGER
        },
        fk_buyer_user_id: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'order_details',
        timestamps: false
    });
    OrderDetail.associate = (models) => {
        OrderDetail.belongsTo(models.ShopOrder, {
            as: 'shop_orders',
            foreignKey: 'order_fk_id'
        })
        OrderDetail.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_fk_id'
        })
        OrderDetail.belongsTo(models.User, {
            as: 'vendor_users',
            foreignKey: 'fk_vendor_user_id'
        })
        OrderDetail.belongsTo(models.User, {
            as: 'buyer_users',
            foreignKey: 'fk_buyer_user_id'
        })
    }
    return OrderDetail
}