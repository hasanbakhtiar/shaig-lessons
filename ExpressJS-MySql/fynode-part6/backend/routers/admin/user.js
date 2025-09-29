const express = require("express");
const {
  createUser,
  singleUser,
  deleteSingleUser,
  listUser,
} = require("../../controllers/user");
const route = express.Router();

route.get("/", listUser);
route.get("/:id", singleUser);
route.post("/", createUser);
route.delete("/:id", deleteSingleUser);

module.exports = route;
