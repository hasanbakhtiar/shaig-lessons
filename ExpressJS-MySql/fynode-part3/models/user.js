const { DataTypes, ENUM } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define(
  "user",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
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
  },
  { timestamps: true },
);

const userValidate = (user) => {
  const schema = new Joi.object({
    fullname: Joi.string().allow(null, ""),
    phone: Joi.string().allow(null, ""),
    email: Joi.string().allow(null, ""),
    password: Joi.string().allow(null, ""),
    role: Joi.string().allow(null, ""),
  });
  return schema.validate(user);
};

module.exports = { User, userValidate };
