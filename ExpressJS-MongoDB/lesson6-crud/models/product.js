const { default: mongoose } = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productID: String,
    slug: String,
    title: String,
    price: {
      type: Number,
      required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    description: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
