const express = require('express');
const route = express.Router();

const ConfigsController = require('../controllers/configs.controller');

//get Configs
route.get('/', ConfigsController.getAllConfigs);

//update
route.put('/', ConfigsController.updateConfigs);

module.exports = route;