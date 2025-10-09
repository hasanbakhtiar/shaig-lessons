const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const jwt = require("jsonwebtoken");
const Joi = require("joi");
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
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
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
    refreshToken: Joi.string().allow(null, ""),
  });
  return schema.validate(user);
};

User.prototype.createAuthToken = function() {
  const accessToken = jwt.sign(
    {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      phone: this.phone,
      role: this.role,
    },
    "accessPrivateKey",
    { expiresIn: "15m" },
  );
  return accessToken;
};

User.prototype.createRefreshToken = function() {
  const refreshToken = jwt.sign(
    {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      phone: this.phone,
      role: this.role,
    },
    "refreshPrivateKey",
    { expiresIn: "7d" },
  );
  return refreshToken;
};

module.exports = { User, userValidate };
