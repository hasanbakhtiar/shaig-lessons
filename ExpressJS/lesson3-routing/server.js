const express = require('express');
const app = express();
const path = require('path');
const homeRoute = require('./routes/home.js');
const productRoute = require('./routes/product.js');
const contactRoute = require('./routes/contact.js');
app.use('/', homeRoute);
app.use('/product', productRoute);
app.use('/contact',contactRoute);
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,"./views/notfoundpage.html"));
})

app.listen(3000, () => {
  console.log('Running port on 3000');
});
