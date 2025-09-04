const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const basketSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: {
      list: [
        {
          quantity: Number,
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        },
      ],
      totalAmount: String,
    },
  },
  { timestamps: true }
);

const validateBasket = (basket) => {
  const schema = new Joi.object({
    user: Joi.string(),
    products: Joi.object(),
  });
  return schema.validate(basket);
};

const Basket = mongoose.model('Basket', basketSchema);
module.exports = { Basket, validateBasket };
