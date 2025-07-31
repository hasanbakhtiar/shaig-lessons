const express = require('express');
const app = express();
const connectdb = require('./config/connectdb');
app.use(express.json());



const surfaceRoute = require('./routes/surface');
app.use('/api',surfaceRoute);


//====================Admin routes======================

const productRoute = require('./routes/admin/product');
const categoryRoute = require('./routes/admin/category');
const userRoute = require('./routes/admin/user');

app.use('/ad/category',categoryRoute);
app.use('/ad/product',productRoute);
app.use('/ad/user',userRoute);


app.use('/',(req,res)=>{res.status(200).send('App Start')});

connectdb();

app.listen(3000,()=>{
  console.log("Server on port 3000 running...");
})




