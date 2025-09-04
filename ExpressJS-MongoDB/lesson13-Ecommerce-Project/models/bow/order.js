const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullname: String,
    email: String,
    phone: String,
    address: String,

    paymentStatus: {
      type: String,
      enum: ['approved', 'pending', 'cancel'],
      default: 'pending',
    },
    basket: { type: mongoose.Schema.Types.ObjectId, ref: 'Basket' },
    totalAmount: String,
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

    basket: Joi.string(),
  });
  return schema.validate(order);
};

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order, validateOrder };
