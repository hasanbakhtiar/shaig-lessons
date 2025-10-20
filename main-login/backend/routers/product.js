const express = require("express");
const { listProduct, deleteProduct, createProduct } = require("../controllers/product");
const route = express.Router();

route.get("/", listProduct);
route.post("/", createProduct);
route.delete("/:id", deleteProduct);

module.exports = route;