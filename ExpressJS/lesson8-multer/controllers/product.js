const { default: slugify } = require('slugify');
const { Product, productValidate } = require('../models/product');
const { generateSecureUniqueId } = require('../utils/idGenerator');
const {
  deleteSingleOldImage,
  deleteManyOldImage,
} = require('../utils/deleteOldImage');
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

  if (req.query.page || req.query.limit) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    product = await Product.find().skip(skip).limit(limit).exec();
    res.status(200).json({
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      product: product,
    });
  } else {
    if (req.query.category || req.query.title || req.query.price) {
      product = await Product.find({
        title: req.query.title,
        price: req.query.price,
        category: req.query.category,
      })
        .sort({ price: -1, title: 1 })
        .populate('category');
    } else {
      product = await Product.find().populate('category');
    }
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
    let filesObj = req.files;
    let filesObjLength = Object.keys(filesObj).length;
    if (filesObjLength !== 0) {
      const uploadFile = [];
      req.files.images.map(async (item) => {
        uploadFile.push(item.path);
      });
      product.images = uploadFile;
      product.thumbnail = req.files.thumbnail[0].path;
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
    let filesObj = req.files;
    let filesObjLength = Object.keys(filesObj).length;
    if (filesObjLength !== 0) {
      product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      if (!product) {
        res.status(404).json({
          statusMessage: 'This product not found',
        });
      } else {
        product = await Product.findByIdAndUpdate(req.params.id, {
          ...req.body,
        });
        const oldImages = product.images;
        deleteManyOldImage(oldImages);
        const oldThumbnail = product.thumbnail;
        deleteSingleOldImage(oldThumbnail);
        const uploadFile = [];
        req.files.images.map(async (item) => {
          uploadFile.push(item.path);
        });
        product.images = uploadFile;
        product.thumbnail = req.files.thumbnail[0].path;
        await product.save();
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
  deleteSingleOldImage(product.thumbnail);
  deleteManyOldImage(product.images);
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
