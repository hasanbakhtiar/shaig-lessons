const express = require("express");
const app = express();
require("dotenv").config();

//middleware start
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/sequelize");
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const staticAccess = require("./middlewares/auth/staticAccess.js");
app.use(staticAccess);

//Surface Endpoint start
const surfaceRoute = require("./routers/client/surface.js");
app.use("/api/v1", surfaceRoute);

//Auth routers start
const auth = require("./middlewares/auth/auth.js");
app.use(auth);

const accountRoute = require("./routers/needAuth/account.js");
app.use("/api/v1/account", accountRoute);

//Admin routers start
const isAdmin = require("./middlewares/auth/isAdmin.js");
app.use(isAdmin);

const adminUrl = "/api/v1/ad";
const productRoute = require("./routers/admin/product.js");
app.use(`${adminUrl}/product`, productRoute);

const categoryRoute = require("./routers/admin/category.js");
app.use(`${adminUrl}/category`, categoryRoute);

const userRoute = require("./routers/admin/user.js");
app.use(`${adminUrl}/user`, userRoute);

//App Start
app.use("/", (req, res) => {
  res.status(200).send("App Start");
});

//Sequelize Start
async () => {
  await sequelize.sync({ force: true });
};

//Server Start
app.listen(3000, () => {
  console.log(`Express server is running on port 3000`);
});
