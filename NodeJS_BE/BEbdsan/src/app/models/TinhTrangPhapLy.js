const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class TinhTrangPhapLy extends Model { };
    TinhTrangPhapLy.init({
        PL_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PL_Ten: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return TinhTrangPhapLy;
}

