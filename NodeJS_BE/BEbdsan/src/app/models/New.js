const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class New extends Model { };
    New.init({
        TinMa: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TieuDe: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        HinhTieuDe: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        Tin_DuongDan: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        Mota: {
            type: DataTypes.TEXT,
            allowNull: false,
           
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
    });
    return New;
}

