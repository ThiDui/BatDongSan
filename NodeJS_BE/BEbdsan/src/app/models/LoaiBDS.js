const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class LoaiBDS extends Model { };
    LoaiBDS.init({
        L_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        L_Ten: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return LoaiBDS;
}

