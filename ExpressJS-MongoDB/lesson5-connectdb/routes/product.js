const express = require('express');
const route = express.Router();
const {listProduct, createProduct, singleProduct} = require('../controllers/product');

route.post('/',createProduct);
route.get('/', listProduct)
route.get('/:id',singleProduct);

module.exports = route;
