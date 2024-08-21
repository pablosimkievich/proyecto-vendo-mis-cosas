module.exports = (sequelize, dataTypes) => {
    const UserReview = sequelize.define('UserReview', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vendor_user_fk_id: {
            type: dataTypes.INTEGER
        },
        review_title: {
            type: dataTypes.STRING
        },
        review_text: {
            type: dataTypes.STRING
        },
        review_rating: {
            type: dataTypes.INTEGER
        },
        buyer_user_fk_id: {
            type: dataTypes.INTEGER
        },
    },
    {
        tableName: 'user_reviews',
        timestamps: false
    });
    UserReview.associate = (models) => {
        UserReview.belongsTo(models.User, {
            as: 'vendor_users',
            foreignKey: 'vendor_user_fk_id'
        })
        UserReview.belongsTo(models.User, {
            as: 'buyer_users',
            foreignKey: 'buyer_user_fk_id'
        })
    }

    return UserReview
}