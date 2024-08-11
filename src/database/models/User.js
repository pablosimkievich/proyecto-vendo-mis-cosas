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
            as: 'user_reviews',
            foreignKey: 'user_fk_id'
        })
    };
    return User;
}