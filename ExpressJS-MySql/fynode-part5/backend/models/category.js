const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Category = sequelize.define(
  "categories",
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title_az: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true },
);

const categoryValidate = (category) => {
  const schema = new Joi.object({
    slug: Joi.string().allow(null, ""),
    title_az: Joi.string().allow(null, ""),
    title_en: Joi.string().allow(null, ""),
  });
  return schema.validate(category);
};

module.exports = { Category, categoryValidate };
