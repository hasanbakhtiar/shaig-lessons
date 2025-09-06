const express = require("express");

const Products = require("./models/products");
const sequelize = require("./config/sequelize");
const app = express();

app.use(express.json());

const productRoute = require("./routers/products.js");
app.use("/products", productRoute);

async () => {
  await sequelize.sync({ force: true });
};

app.listen(3000, () => {
  console.log("start");
});
