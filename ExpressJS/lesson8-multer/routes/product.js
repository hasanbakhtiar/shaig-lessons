const express = require('express');
const route = express.Router();
const {
  listProduct,
  createProduct,
  singleProduct,
  deleteProduct,
  allDeleteProducts,
  updateProduct,
  searchProduct,
} = require('../controllers/product');
const upload = require('../middlewares/uploadFile');

route.get('/', listProduct);
route.get('/search', searchProduct);
route.get('/:id', singleProduct);

// route.post('/',upload.single('thumbnail'),createProduct);
route.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  createProduct
);

route.put(
  '/:id',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  updateProduct
);

route.delete('/:id', deleteProduct);
route.delete('/delete/all', allDeleteProducts);

module.exports = route;
