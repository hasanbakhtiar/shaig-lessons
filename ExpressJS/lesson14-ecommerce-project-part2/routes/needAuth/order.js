
const express = require('express');
const route = express.Router();
const {basketDataForUser,updateBasket} = require('../../controllers/order/basket');
const {orderDataForUser,createOrder} = require('../../controllers/order/order');

route.get('/basket/:userid', basketDataForUser);
route.put('/basket/:userid', updateBasket);

route.get('/order/:userid', orderDataForUser);
route.post('/order/:userid', createOrder);


module.exports = route;
