const express = require('express');
const app = express();
const connectdb = require('./config/connectdb');
const productRoute = require('./routes/product');

app.use(express.json());

app.use('/product',productRoute);

app.use('/',(req,res)=>{
  res.status(200).send('App Start');
})


connectdb();

app.listen(3000,()=>{
  console.log("Server on port 3000 running...");
})




