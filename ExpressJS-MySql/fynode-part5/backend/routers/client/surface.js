const express = require("express");
const { listProduct } = require("../../controllers/product");
const { listGeneralInfo } = require("../../controllers/generalinfo");
const { listCategory } = require("../../controllers/category");
const { register, login } = require("../../controllers/auth");
const route = express.Router();

route.get("/products", listProduct);
route.get("/category", listCategory);
route.get("/generalinfo", listGeneralInfo);

route.post("/register", register);
route.post("/login", login);
module.exports = route;
