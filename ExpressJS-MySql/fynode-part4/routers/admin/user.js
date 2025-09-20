const express = require("express");
const {
  createUser,
  singleUser,
  deleteSingleUser,
  listUser,
  editUser,
} = require("../../controllers/user");
const route = express.Router();

route.get("/", listUser);
route.get("/:id", singleUser);
route.post("/", createUser);
route.put("/:id", editUser);
route.delete("/:id", deleteSingleUser);

module.exports = route;
