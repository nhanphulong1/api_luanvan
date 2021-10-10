const express = require('express');
const route = express.Router();

const ScheduleController = require('../controllers/Schedule.controller');

//get Schedule by id
route.get('/:id', ScheduleController.getScheduleById);

//get Schedule by id
route.post('/check', ScheduleController.checkSchedule);

//post create Schedule
route.post('/', ScheduleController.createSchedule);

//Delete Schedule by id
route.delete('/:id', ScheduleController.deleteSchedule);

module.exports = route;