const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class LienHe extends Model { };
    LienHe.init({
        LH_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LH_TenChuSoHuu: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        },
        LH_SoDienThoai: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        LH_Email: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        },
        LH_DiaChi: {
            type: DataTypes.STRING,
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return LienHe;
}

