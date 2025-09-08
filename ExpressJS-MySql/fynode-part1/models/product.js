


const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = sequelize.define("product", {
  SKU: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  discount_price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description_az: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description_en: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.STRING,
    allowNull: true,
  }



});

const productValidate = (product) => {
  const schema = new Joi.object({
    SKU: Joi.string().allow(null, ""),
    slug: Joi.string().allow(null, ""),
    thumbnail: Joi.string().allow(null, ""),
    images: Joi.string().allow(null, ""),
    title_az: Joi.string().allow(null, ""),
    title_en: Joi.string().allow(null, ""),
    price: Joi.string().allow(null, ""),
    discount_price: Joi.string().allow(null, ""),
    product: Joi.string().allow(null, ""),
    description_az: Joi.string().allow(null, ""),
    description_en: Joi.string().allow(null, ""),
    color: Joi.string().allow(null, ""),
    brand: Joi.string().allow(null, ""),
    status: Joi.boolean().allow(null),
    created_at: Joi.string().allow(null, "")
  });
  return schema.validate(product);
};


module.exports = { Product, productValidate };
