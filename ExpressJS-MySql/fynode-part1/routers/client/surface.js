const express = require('express');
const { listProduct } = require('../../controllers/product');
const route = express.Router();

route.get('/products', listProduct);


module.exports = route;

