const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { type } = require("os");

const Message = sequelize.define(
    "message",
    {
        message: {
            type: DataTypes.STRING,
            allowNull: true,
        }, senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    { timestamps: true },
);

module.exports = { Message };