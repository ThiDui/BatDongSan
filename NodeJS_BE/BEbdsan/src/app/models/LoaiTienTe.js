const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class LoaiTienTe extends Model { };
    LoaiTienTe.init({
        LTT_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LTT_Ten: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return LoaiTienTe;
}

