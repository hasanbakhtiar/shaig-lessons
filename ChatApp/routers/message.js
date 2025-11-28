const express = require("express");
const { listMessage, createMessage, deleteSingleMessage, listSingleMessage } = require("../controllers/message");
const route = express.Router();

route.get("/", listMessage);

route.get("/:id", listSingleMessage);

route.post("/", createMessage);

route.delete("/:id", deleteSingleMessage);

module.exports = route;