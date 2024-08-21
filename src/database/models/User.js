module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: dataTypes.STRING
        },
        user_email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        sales_description: {
            type: dataTypes.STRING
        },
        user_avatar: {
            type: dataTypes.STRING
        },
        user_type_fk_id: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'users',
        timestamps: false
    });
    User.associate = (models) => {
        User.belongsTo(models.UserType, {
            as: 'user_type',
            foreignKey: 'user_type_fk_id'
        });
        User.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'user_fk_id'
        })
        User.hasMany(models.UserReview, {
            as: 'vendor_user_reviews',
            foreignKey: 'vendor_user_fk_id'
        })
        User.hasMany(models.UserReview, {
            as: 'buyer_user_reviews',
            foreignKey: 'buyer_user_fk_id'
        })
        User.hasMany(models.ShopOrder, {
            as: 'vendor_shop_orders',
            foreignKey: 'vendor_user_fk_id'
        })
        User.hasMany(models.ShopOrder, {
            as: 'buyer_shop_orders',
            foreignKey: 'buyer_user_fk_id'
        })
        User.hasMany(models.OrderDetail, {
            as: 'vendor_order_details',
            foreignKey: 'fk_vendor_user_id'
        })
        User.hasMany(models.OrderDetail, {
            as: 'buyer_order_details',
            foreignKey: 'fk_buyer_user_id'
        })
    };
    return User;
}