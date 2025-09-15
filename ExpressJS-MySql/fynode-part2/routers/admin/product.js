const express = require("express");
const {
  createProduct,
  deleteSingleProduct,
} = require("../../controllers/product");
const route = express.Router();
const uploadFile = require("../../middlewares/uploadFile.js");

route.post(
  "/",
  uploadFile.fields([
    { name: "images", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createProduct,
);
route.put("/:id", createProduct);
route.delete("/:id", deleteSingleProduct);

module.exports = route;
