const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class ChucVu extends Model { };
    ChucVu.init({
        ma_chucvu: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ten_chucvu: {
            type: DataTypes.STRING,
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return ChucVu;
}

