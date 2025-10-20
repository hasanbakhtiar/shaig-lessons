const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");


const User = sequelize.define(
    "user",
    {
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM,
            default: "user",
            values: ["admin", "user"],
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: true },
);

module.exports = { User };