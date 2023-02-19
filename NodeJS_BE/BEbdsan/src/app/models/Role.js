const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class Role extends Model { };
    Role.init({
        QTC_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "QTC_Ma"
        },
        QTC_Ten: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "QTC_Ten"
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return Role;
}

