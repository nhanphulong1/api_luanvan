const express = require('express');
const route = express.Router();

const ScheduleController = require('../controllers/Schedule.controller');

//get Schedule by id
route.get('/:id', ScheduleController.getScheduleById);

//get Schedule by teacher id
route.get('/teacher/:id', ScheduleController.getScheduleByTeacher);

//get Schedule by class
route.post('/check', ScheduleController.checkSchedule);

//check Schedule by teacher
route.post('/checkTeacher', ScheduleController.checkScheduleByTeacher);

//post create Schedule
route.post('/', ScheduleController.createSchedule);

//Delete Schedule by id
route.delete('/:id', ScheduleController.deleteSchedule);

module.exports = route;