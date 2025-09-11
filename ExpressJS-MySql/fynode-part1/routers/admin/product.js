const express = require("express");
const {
  createProduct,
  deleteSingleProduct,
} = require("../../controllers/product");
const route = express.Router();
const uploadFile = require("../../middlewares/uploadFile.js");

route.post("/", uploadFile.single("thumbnail"), createProduct);
route.put("/:id", createProduct);
route.delete("/:id", deleteSingleProduct);

module.exports = route;
