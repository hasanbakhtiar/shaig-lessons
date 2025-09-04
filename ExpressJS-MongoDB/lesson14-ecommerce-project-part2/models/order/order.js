const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    basket: { type: mongoose.Schema.Types.ObjectId, ref: 'Basket' },
    totalAmount: String,

    orderDetails: {
      fullname: String,
      email: String,
      phone: String,
      address: String,
    },
    paymentStatus: {
      type: String,
      enum: ['approved', 'pending', 'cancel'],
      default: 'pending',
    },
    date: String,
  },
  { timestamps: true }
);

const validateOrder = (order) => {
  const schema = new Joi.object({
    user: Joi.string(),
    basket: Joi.string(),
    totalAmount: Joi.string(),

    orderDetails: Joi.object(),
    paymentStatus: Joi.string(),
    date: Joi.string(),
  });
  return schema.validate(order);
};

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order, validateOrder };
