const express = require('express');
const route = express.Router();

const ShiftController = require('../controllers/shift.controller');

//get Shift by id
route.get('/', ShiftController.getAllShift);

module.exports = route;