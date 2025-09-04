

const express = require('express');
const route = express.Router();
const path = require('path');

route.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/contact.html"));
})
route.post('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/homepage.html"))
})

module.exports = route;
