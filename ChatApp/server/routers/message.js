const express = require("express");
const { listMessage, createMessage, deleteSingleMessage, listSingleMessage, listMessageforUser } = require("../controllers/message");
const route = express.Router();

route.get("/", listMessage);

route.get("/user/:userid", listMessageforUser);

route.get("/:id", listSingleMessage);

route.post("/user/:userid", createMessage);

route.delete("/:id", deleteSingleMessage);

module.exports = route;