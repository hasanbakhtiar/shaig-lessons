const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: String,
    fullname: String,
    email: String,
    phone: String,
    address: String,

    totalAmount: String,

    paymentStatus: {
      type: String,
      enum: ['approved', 'pending', 'cancel'],
      default: 'pending',
    },

    products: {
      list: [
        {
          quantity: Number,
          product: String,
        },
      ],
      totalAmount: String,
    },
  },
  { timestamps: true }
);

const validateOrder = (order) => {
  const schema = new Joi.object({
    user: Joi.string(),
    fullname: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    address: Joi.string(),

    totalAmount: Joi.string(),

    paymentStatus: Joi.string()
      .valid('approved', 'pending', 'cancel')
      .default('pending'),

    products: Joi.object({
      list: Joi.array().items(
        Joi.object({
          quantity: Joi.number().integer().min(1),
          product: Joi.string(),
        })
      ),
      totalAmount: Joi.string(),
    }),
  });
  return schema.validate(order);
};

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order, validateOrder };
