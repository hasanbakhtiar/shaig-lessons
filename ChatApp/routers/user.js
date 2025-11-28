const express = require("express");
const { listUser, createUser, deleteSingleUser, listSingleUser } = require("../controllers/user");
const route = express.Router();

route.get("/", listUser);

route.get("/:id", listSingleUser);

route.post("/", createUser);

route.delete("/:id", deleteSingleUser);

module.exports = route;