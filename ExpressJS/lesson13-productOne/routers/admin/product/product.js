const express = require('express');
const route = express.Router();
const {
  createProduct,
  deleteProduct,
  allDeleteProducts,
  updateProduct,
} = require('../../../controllers/product/product');

route.post('/', createProduct);

route.put('/:id', updateProduct);

route.delete('/:id', deleteProduct);
route.delete('/delete/all', allDeleteProducts);

module.exports = route;
