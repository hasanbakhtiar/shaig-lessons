const Joi = require('joi');

const loginValidate = (data) => {
  const schema = new Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const registerValidate = (data) => {
  const schema = new Joi.object({
    fullname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string(),
    role: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = { loginValidate, registerValidate };
