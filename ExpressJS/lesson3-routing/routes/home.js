
const express = require('express');
const route = express.Router();
// const {showPage}  =require('../controllers/home.js');
const path = require('path');

route.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/homepage.html"));
})

module.exports = route;
