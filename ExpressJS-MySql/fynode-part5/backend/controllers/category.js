const { default: slugify } = require("slugify");
const { Category } = require("../models/category.js");
const {
  generateSecureUniqueId,
  idForSlug,
} = require("../utils/idGenerator.js");
const {
  createMessage,
  errorMessage,
  deleteMessage,
} = require("../utils/infoMessage.js");

exports.listCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const dataBody = {
      slug: slugify(req.body.title_en, { lower: true }) + "-" + idForSlug(),
      ...req.body,
    };
    const category = await Category.create(dataBody);
    res.status(201).json(createMessage("Category", category));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.editCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteSingleCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.status(200).json(deleteMessage("Category", category));
    } else {
      res.status(404).json(errorMessage("Not Found Category"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(errorMessage("Category", error.message));
  }
};
