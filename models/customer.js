module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        Name: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: { len: [1, 64],  
            is: /[\w ]/g  // A-Z, a-z, 0-9, or a space 
            }
        }
        },{
        timestamps: false
    });
    Customer.associate = function (models) {
        Customer.hasMany(models.Burger);
    }
    return Customer;
};