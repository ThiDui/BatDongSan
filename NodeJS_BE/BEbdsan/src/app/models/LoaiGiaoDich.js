const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class LoaiGiaoDich extends Model { };
    LoaiGiaoDich.init({
        LGD_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LGD_Ten: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return LoaiGiaoDich;
}

