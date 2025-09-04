
const express = require('express');
const route = express.Router();
const {accountInfo} = require('../../controllers/auth/account');

route.get('/:id', accountInfo);



module.exports = route;
