const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class HinhBDS extends Model { };
    HinhBDS.init({
        HA_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        HA_DuongDan: {
            type: DataTypes.STRING,
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return HinhBDS;
}

