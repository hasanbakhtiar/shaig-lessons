const express = require('express');
const route = express.Router();
const {listProduct, createProduct, singleProduct, deleteProduct, allDeleteProducts, updateProduct, searchProduct} = require('../controllers/product');

route.get('/', listProduct)
route.get('/search', searchProduct)
route.get('/:id',singleProduct);

route.post('/',createProduct);

route.put('/:id',updateProduct);

route.delete('/:id', deleteProduct);
route.delete('/delete/all', allDeleteProducts);



module.exports = route;
