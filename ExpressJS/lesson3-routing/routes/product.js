const express = require('express');
const route = express.Router();
const {allList,productCat} = require('../controllers/products.js');
const path = require('path');

route.get('/',(req,res)=>{
 res.sendFile(path.join(__dirname,"../views/products.html"));

})
// route.get('/:id',(req,res)=>{
//   res.sendFile(path.join(__dirname,"../views/product-details.html"));
// })
//
route.get('/:category',productCat)


module.exports = route;
