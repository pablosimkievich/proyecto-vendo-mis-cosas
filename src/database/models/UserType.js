module.exports = (sequelize, dataTypes) => {
    const UserType = sequelize.define('UserType', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'user_type',
        timeStamps: false
    });
    UserType.associate = (models) => {
        UserType.hasMany(models.User, {
            as: 'users',
            foreignKey: 'user_type_fk_id'
        });
    }
    
    return UserType;
}