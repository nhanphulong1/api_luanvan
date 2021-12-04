const express = require('express');
const route = express.Router();

const PermissionController = require('../controllers/permission.controller');

//get all Permission
route.get('/', PermissionController.getAllPermission);
route.get('/user/:user', PermissionController.getPermissionByUser);

//post create Permission
route.put('/:user', PermissionController.updatePermissionUser);

module.exports = route;