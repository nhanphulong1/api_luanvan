const express = require('express');
const route = express.Router();

const LocationController = require('../controllers/Location.controller');

//get Location by id
route.get('/', LocationController.getAllLocation);

module.exports = route;