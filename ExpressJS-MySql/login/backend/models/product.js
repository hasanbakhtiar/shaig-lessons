
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");


const Product = sequelize.define(
    "product",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    { timestamps: true }
);




module.exports = { Product };
