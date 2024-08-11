module.exports = (sequelize, dataTypes) => {
    const ProductAdditionalImage = sequelize.define('ProductAdditionalImage', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_fk_id: {
            type: dataTypes.INTEGER
        },
        image_2: {
            type: dataTypes.STRING
        },
        image_3: {
            type: dataTypes.STRING
        },
        image_4: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'product_additional_images',
        timestamps: false
    });
    ProductAdditionalImage.associate = (models) => {
        ProductAdditionalImage.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_fk_id'
        });
    }

    return ProductAdditionalImage;
}