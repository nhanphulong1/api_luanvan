const express = require('express');
const route = express.Router();

const DayController = require('../controllers/Day.controller');

//get Day by id
route.get('/', DayController.getAllDay);

module.exports = route;