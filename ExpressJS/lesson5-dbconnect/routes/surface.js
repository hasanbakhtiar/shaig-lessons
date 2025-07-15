const express = require('express');
const route = express.Router();
const { Product } = require('../models/product.js');

route.post('/product/create', async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.status(200).send(result);
});

route.get('/product', (req, res) => {
  res.send('Product');
});

module.exports = route;
