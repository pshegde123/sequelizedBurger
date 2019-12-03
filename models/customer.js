module.exports = function(sequelize,DataTypes){
    var Customer = sequelize.define("Customer",{
        Name: { type: DataTypes.STRING, allowNull: false }
    },{
        timestamps: false
    });
    Customer.associate = function(models){
        Customer.hasMany(models.Burger)
    };
    return Customer;
};  