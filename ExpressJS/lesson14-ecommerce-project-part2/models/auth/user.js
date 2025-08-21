const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: String,
    phone: String,
    password: String,
    gender:{
      type:String,
      enum:["male","female",'rather not say'],
      default:"rather not say"
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'user'],
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
    password: Joi.string().required(),
    gender:Joi.string(),
    role: Joi.string(),
  });
  return schema.validate(user);
};

userSchema.methods.createAuthToken = function () {
  const decodedToken = jwt.sign(
    {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
      phone: this.phone,
      role: this.role,
    },
   "jwtPrivateKey" 
  );
  return decodedToken;
};

const User = mongoose.model('User', userSchema);
module.exports = { User, validateUser };
