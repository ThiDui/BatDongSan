const { DataTypes, Model } = require('sequelize');
const bcryptjs = require("bcryptjs");
module.exports = (sequelize) => {
    class User extends Model { };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,

        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            set(value) {
                this.setDataValue("password", bcryptjs.hashSync(value));
            }
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            timestamps: false
        });
    return User;
}

