const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: String,
    phone: String,
    password:String,
    role: {
      type: String,
      enum: ['admin', 'mod', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const validateUser = (user) => {
  const schema = new Joi.object({
    fullname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string(),
    role: Joi.string(),
  });
  return schema.validate(user);
};

const User = mongoose.model('User', userSchema);
module.exports = { User, validateUser };
