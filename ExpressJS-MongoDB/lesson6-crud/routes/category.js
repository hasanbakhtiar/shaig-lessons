const express = require('express');
const route = express.Router();
const {
  listCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/category');

route.get('/', listCategory);

route.post('/', createCategory);

route.put('/:id', updateCategory);

route.delete('/:id', deleteCategory);

module.exports = route;
