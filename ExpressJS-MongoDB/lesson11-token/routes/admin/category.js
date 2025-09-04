const express = require('express');
const route = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../../controllers/category');


route.post('/', createCategory);

route.put('/:id', updateCategory);

route.delete('/:id', deleteCategory);

module.exports = route;
