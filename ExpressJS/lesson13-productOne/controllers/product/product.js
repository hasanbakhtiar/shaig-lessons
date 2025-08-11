const { default: slugify } = require('slugify');
const { Product, productValidate } = require('../../models/product/product');

exports.listProduct = async (req, res) => {
  let product = await Product.find().populate('category');

  res.status(200).json({
    dataLength: product.length,
    data: product,
  });
};

exports.createProduct = async (req, res) => {
  const { error } = productValidate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  } else {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(201).json({
      statusMessage: 'Created',
      data: result,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = productValidate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  } else {
    let product = await Product.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    if (!product) {
      res.status(404).json({
        statusMessage: 'This product not found',
      });
    } else {
      res.status(200).json({
        statusMessage: 'Product was updated!',
        data: product,
      });
    }
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404).json({
      statusMessage: 'This product not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'Deleted',
      data: product,
    });
  }
};

exports.allDeleteProducts = async (req, res) => {
  const product = await Product.deleteMany();
  if (!product) {
    res.status(404).json({
      statusMessage: 'This product not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'All products were deleted!',
      data: product,
    });
  }
};
