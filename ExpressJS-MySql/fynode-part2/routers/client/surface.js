const express = require("express");
const { listProduct } = require("../../controllers/product");
const { listGeneralInfo } = require("../../controllers/generalinfo");
const route = express.Router();

route.get("/products", listProduct);
route.get("/generalinfo", listGeneralInfo);
module.exports = route;
