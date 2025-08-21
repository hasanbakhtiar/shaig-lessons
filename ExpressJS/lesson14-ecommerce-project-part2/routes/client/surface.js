const express = require('express');
const route = express.Router();

const { listCategory } = require('../../controllers/category');
const {
  listProduct,
  searchProduct,
  singleProduct,
} = require('../../controllers/product');

route.get('/category', listCategory);

route.get('/product', listProduct);
route.get('/product/search', searchProduct);
route.get('/product/:id', singleProduct);







module.exports = route;
