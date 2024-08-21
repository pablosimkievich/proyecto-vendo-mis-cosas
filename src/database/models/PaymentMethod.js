module.exports = (sequelize, dataTypes) => {
    const PaymentMethod = sequelize.define('PaymentMethod', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pay_method_type: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'payment_methods',
        timestamps: false
    });
    PaymentMethod.associate = (models) => {
        PaymentMethod.hasMany(models.ShopOrder, {
            as: 'shop_orders',
            foreignKey: 'pay_method_fk_id'
        })
    }
   return PaymentMethod
}