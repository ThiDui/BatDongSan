const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class XaPhuong extends Model { };
    XaPhuong.init({
        XP_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        XP_Ten: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        XP_Loai: {
            type: DataTypes.STRING(50),
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return XaPhuong;
}

