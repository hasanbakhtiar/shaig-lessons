import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your sequelize instance

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    userId: {
      type: DataTypes.INTEGER, // Assuming userId is an integer
      allowNull: false,
      references: {
        model: "Users", // Referring to the Users table
        key: "id", // Assuming the Users table has an `id` column
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    tableName: "refresh_tokens", // Optional: specify custom table name
  },
);

module.exports = { RefreshToken };
