const express = require('express');
const route = express.Router();
const {
  listUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../../controllers/auth/user');

route.get('/', listUser);

route.post('/', createUser);

route.put('/:id', updateUser);

route.delete('/:id', deleteUser);

module.exports = route;
