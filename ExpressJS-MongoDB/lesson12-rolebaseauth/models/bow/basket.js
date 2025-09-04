


const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const basketSchema = mongoose.Schema(
  {
    user: String,
    products:Array
  },
  { timestamps: true }
);

const validateBasket = (basket)=>{
  const schema = new Joi.object({
    user:Joi.string(),
    products:Joi.array()
  })
  return schema.validate(basket);
}

const Basket = mongoose.model('Basket', basketSchema);
module.exports = { Basket,validateBasket };
