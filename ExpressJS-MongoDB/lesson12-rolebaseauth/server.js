const express = require('express');
const app = express();
const connectdb = require('./config/connectdb');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// const {accessToken} = require('./middlewares/staticAccess');
// app.use(accessToken);

const surfaceRoute = require('./routes/surface');
app.use('/api',surfaceRoute);


//====================Admin routes======================

const productRoute = require('./routes/admin/product');
const categoryRoute = require('./routes/admin/category');
const userRoute = require('./routes/admin/user');

// const auth = require('./middlewares/auth');
// app.use(auth);

const accountRoute = require('./routes/needAuth/account');
app.use('/account',accountRoute);


// const isAdmin = require('./middlewares/isAdmin');
// app.use(isAdmin);
app.use('/ad/category',categoryRoute);
app.use('/ad/product',productRoute);
app.use('/ad/user',userRoute);


app.use('/',(req,res)=>{res.status(200).send('App Start')});

connectdb();

app.listen(3000,()=>{
  console.log("Server on port 3000 running...");
})




