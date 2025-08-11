const express = require('express');
const app = express();
const connectdb = require('./config/connectdb');

const cors = require('cors');
app.use(cors());
app.use(express.json());


connectdb();

app.listen(3000,()=>{
  console.log("Server on port 3000 running...");
})