const express = require("express");
const {
  createCategory,
  deleteSingleCategory,
} = require("../../controllers/category");
const route = express.Router();

route.post("/", createCategory);
route.put("/:id", createCategory);
route.delete("/:id", deleteSingleCategory);

module.exports = route;
