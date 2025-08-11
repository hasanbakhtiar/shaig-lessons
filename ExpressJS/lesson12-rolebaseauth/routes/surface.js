const express = require('express');
const route = express.Router();

const { listCategory } = require('../controllers/category');
const { listBasket, createBasket } = require('../controllers/bow/basket');

const {
  listProduct,
  searchProduct,
  singleProduct,
} = require('../controllers/product');
const {login} = require('../controllers/auth/auth');

route.get('/basket/:id',listBasket);
route.post('/basket',createBasket);

route.get('/category', listCategory);

route.get('/product', listProduct);
route.get('/product/search', searchProduct);
route.get('/product/:id', singleProduct);



route.post('/login',login);

module.exports = route;
