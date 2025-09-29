const express = require("express");
const { singleAccount, deleteAccount } = require("../../controllers/auth");
const route = express.Router();

route.get("/:id", singleAccount);
route.delete("/:id", deleteAccount);

module.exports = route;
