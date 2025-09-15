const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const GeneralInfo = sequelize.define("generalinfo", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const generalinfoValidate = (category) => {
  const schema = new Joi.object({
    title: Joi.string().allow(null, ""),
    email: Joi.string().allow(null, ""),
    phone: Joi.string().allow(null, ""),
    address: Joi.string().allow(null, ""),
  });
  return schema.validate(generalinfo);
};

module.exports = { GeneralInfo, generalinfoValidate };
