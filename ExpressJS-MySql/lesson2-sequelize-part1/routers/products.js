const express = require("express");
const {
  createProduct,
  listProduct,
  deleteSingleProduct,
} = require("../controllers/products");
const router = express.Router();

router.get("/:id", listProduct);
router.post("/", createProduct);
router.delete("/:id", deleteSingleProduct);

module.exports = router;
