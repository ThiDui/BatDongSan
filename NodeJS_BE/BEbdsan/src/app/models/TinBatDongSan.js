const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class TinBatDongSan extends Model { };
    TinBatDongSan.init({
        BDS_Ma: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        BDS_Ten: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        BDS_DienTich: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        BDS_Gia: {
            type: DataTypes.DECIMAL,
            allowNull: false,

        },
        BDS_SoPhongNgu: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        BDS_SoPhongTam: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        BDS_NgayDang: {
            type: DataTypes.DATE,
            allowNull: false,

        },BDS_NgayHetHan: {
            type: DataTypes.DATE,
            allowNull: false,

        },
        BDS_MoTaChiTiet: {
            type: DataTypes.TEXT,
            allowNull: true,

        },
        BDS_DiaChiCuThe: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        BDS_TrangThai: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            createdAt: true,
            updatedAt: false,
        });
    return TinBatDongSan;
}

