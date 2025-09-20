const Joi = require("joi");
const registerValidate = (data) => {
  const schema = new Joi.object({
    fullname: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
  });
  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = new Joi.object({
    email: Joi.string(),
    password: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = { loginValidate, registerValidate };
