const express = require('express');
const app = express();
const connectdb = require('./config/dbconnect.js');
const surfaceRoute = require('./routes/surface.js');

app.use('/api/v1',surfaceRoute);

app.use('/',(req,res)=>{
    res.send("Start App");
});




connectdb();
app.listen(3000, () => {
  console.log('Running port on 3000');
});
