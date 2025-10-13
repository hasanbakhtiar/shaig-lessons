import sequelize from "../config/sequelize.ts";
import { DataTypes } from "sequelize";


export const Product = sequelize.define(
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
  { timestamps: true },
);


