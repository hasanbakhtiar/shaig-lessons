const { default: mongoose } = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productID: String,
    slug:String,
    title: String,
    price: {
      type:Number,
      require:true
    },
    category: String,
    description: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamp: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
