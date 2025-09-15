const { default: slugify } = require("slugify");
const { Product } = require("../models/product.js");
const {
  generateSecureUniqueId,
  idForSlug,
} = require("../utils/idGenerator.js");
const {
  createMessage,
  errorMessage,
  deleteMessage,
} = require("../utils/infoMessage.js");

exports.listProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(13);
    res.status(200).json(JSON.parse(product.images));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createProduct = async (req, res) => {
  console.log(req);

  try {
    let filesObj = req.files;
    let filesObjLength = Object.keys(filesObj).length;
    if (filesObjLength !== 0) {
      const uploadFile = [];
      req.files.images.map(async (item) => {
        uploadFile.push(item.path);
      });

      const dataBody = {
        SKU: generateSecureUniqueId(),
        slug: slugify(req.body.title_en, { lower: true }) + "-" + idForSlug(),
        images: JSON.stringify(uploadFile),
        thumbnail: req.files.thumbnail[0].path,
        ...req.body,
      };
      const product = await Product.create(dataBody);
      res.status(201).json(createMessage("Product", product));
    } else {
      const dataBody = {
        SKU: generateSecureUniqueId(),
        slug: slugify(req.body.title_en, { lower: true }) + "-" + idForSlug(),
        ...req.body,
      };
      const product = await Product.create(dataBody);
      res.status(201).json(createMessage("Product", product));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.editProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteSingleProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(200).json(deleteMessage("Product", product));
    } else {
      res.status(404).json(errorMessage("Not Found Product"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(errorMessage("Product", error.message));
  }
};
