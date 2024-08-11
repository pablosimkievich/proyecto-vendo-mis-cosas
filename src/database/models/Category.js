module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define('Category', {
        id: { 
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING
        },
        category_description: {
            type: dataTypes.STRING
        },
        category_image: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'categories',
        timestamps: false
    });
    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }
    return Category;
}