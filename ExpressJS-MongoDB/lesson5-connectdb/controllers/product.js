const { default: slugify } = require('slugify');
const { Product } = require('../models/product');
const { generateSecureUniqueId } = require('../utils/idGenerator');

exports.singleProduct = async (req, res) => {
  // const product = await Product.findById(req.params.id);
  const product = await Product.find({ productID: req.params.id });

  res.status(200).json(product);
};

exports.listProduct = async (req, res) => {
  let product;
  if (req.query.category) {
    product = await Product.find({ category: req.query.category });
  } else {
    product = await Product.find();
  }
  res.status(200).json({
    dataLength: product.length,
    data: product,
  });
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.productID = generateSecureUniqueId();
  product.slug = slugify(req.body.title) + generateSecureUniqueId();
  const result = await product.save();
  res.status(201).json({
    statusMessage: 'Created',
    data: result,
  });
};
