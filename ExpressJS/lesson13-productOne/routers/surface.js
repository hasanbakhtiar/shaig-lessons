const express = require('express');
const route = express.Router();

const { listCategory } = require('../controllers/product/category');
const {listProduct} = require('../controllers/product/product');
const {login} = require('../controllers/auth/auth');

route.get('/category', listCategory);
route.get('/product', listProduct);

route.post('/login',login);

module.exports = route;
