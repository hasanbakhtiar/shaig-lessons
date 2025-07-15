const { default: mongoose } = require('mongoose');

const productSchema = mongoose.Schema({
  title:String,
  price:Number,
  desc:String
});

const Product = mongoose.model('Product', productSchema);
module.exports = {Product};
