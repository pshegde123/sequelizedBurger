module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        Name: { type: DataTypes.STRING, 
            allowNull: false,
            validate:{len:[1],
            is: /[\w ]/g  // A-Z, a-z, 0-9, or a space
            }
         },
        Devoured: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        timestamps: false
    });
    Burger.associate = function (models) {
        Burger.belongsTo(models.Customer, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        })
    };
    return Burger;
};