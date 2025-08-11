const { Category, validateCategory } = require('../models/category');

exports.listCategory = async (req, res) => {
  let category;
  if (req.query.category) {
    category = await Category.find({ category: req.query.category });
  } else {
    category = await Category.find();
  }
  res.status(200).json({
    dataLength: category.length,
    data: category,
  });
};

exports.createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400).json({
      message: error.message,
    });
  } else {
    const category = new Category(req.body);
    const result = await category.save();
    res.status(201).json({
      statusMessage: 'Created',
      data: result,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  if (!category) {
    res.status(404).json({
      statusMessage: 'This category not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'Category was updated!',
      data: category,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404).json({
      statusMessage: 'This category not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'Deleted',
      data: category,
    });
  }
};
