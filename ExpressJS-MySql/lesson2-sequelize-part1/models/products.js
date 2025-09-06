const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Products = sequelize.define("products", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Products;
