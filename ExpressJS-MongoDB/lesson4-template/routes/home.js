const express = require('express');
const route = express.Router();
// const {showPage}  =require('../controllers/home.js');
const path = require('path');
route.use('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/about.html'));
});
route.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = route;
