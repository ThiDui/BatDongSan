const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class QuanHuyen extends Model { };
    QuanHuyen.init({
        QH_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        QH_Ten: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        QH_Loai: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return QuanHuyen;
}

