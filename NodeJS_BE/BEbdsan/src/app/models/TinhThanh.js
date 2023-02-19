const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class TinhThanh extends Model { };
    TinhThanh.init({
        TT_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TT_Ten: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        TT_Loai: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return TinhThanh;
}

