module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: dataTypes.STRING
        },
        product_description: {
            type: dataTypes.STRING
        },
        product_price: {
            type: dataTypes.DECIMAL
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        main_image: {
            type: dataTypes.STRING
        },
        user_fk_id: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'products',
        timestamps: false
    });
    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        })
        Product.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_fk_id'
        })
        Product.hasOne (models.ProductAdditionalImage, {
            as: 'product_additional_images',
            foreignKey: 'product_fk_id'
        })
    };

    return Product;
}