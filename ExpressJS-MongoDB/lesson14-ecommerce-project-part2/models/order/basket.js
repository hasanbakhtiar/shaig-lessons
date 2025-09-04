const { default: mongoose } = require('mongoose');

const basketSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        quantity: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        subTotal: Number,
      },
    ],
    totalAmount: String,
  },
  { timestamps: true }
);



const Basket = mongoose.model('Basket', basketSchema);
module.exports = { Basket};
