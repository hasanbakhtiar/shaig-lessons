const { default: slugify } = require('slugify');
const { Product, productValidate } = require('../models/product');
const { generateSecureUniqueId } = require('../utils/idGenerator');
const { deleteSingleOldImage } = require('../utils/deleteOldImage');
exports.searchProduct = async (req, res) => {
  let product;
  if (req.query.keyword) {
    product = await Product.find({ title: req.query.keyword });
  } else if (req.query.category) {
    product = await Product.find({ category: req.query.category });
  }
  res.status(200).json({
    foundDataLength: product.length,
    data: product,
  });
};

exports.singleProduct = async (req, res) => {
  // const product = await Product.findById(req.params.id);
  const product = await Product.find({ productID: req.params.id });

  res.status(200).json(product);
};

exports.listProduct = async (req, res) => {
  let product;
  if (req.query.category) {
    product = await Product.find({ category: req.query.category }).populate(
      'category'
    );
  } else {
    product = await Product.find().populate('category');
  }
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
    product.slug = slugify(req.body.title) + generateSecureUniqueId();
    product.productID = generateSecureUniqueId();

    if (req.file) {
      product.thumbnail = req.file.path;
      const result = await product.save();
      res.status(201).json({
        statusMessage: 'Created',
        data: result,
      });
    } else {
      const result = await product.save();
      res.status(201).json({
        statusMessage: 'Created',
        data: result,
      });
    }
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = productValidate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  } else {
    let product;
    if (req.file) {
      product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      if (!product) {
        res.status(404).json({
          statusMessage: 'This product not found',
        });
      } else {
        // deleteSingleOldImage(product.thumbnail);
        product.thumbnail = req.file.path;
        res.status(200).json({
          statusMessage: 'Product was updated!',
          data: product,
        });
      }
    } else {
      product = await Product.findByIdAndUpdate(req.params.id, {
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
