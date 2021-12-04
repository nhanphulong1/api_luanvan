const express = require('express');
const route = express.Router();

const AttendanceController = require('../controllers/attendance.controller');

//get Attendance by id
route.get('/:di_id', AttendanceController.getAttendanceByDiaries);
route.get('/diaries/:stu_id/:di_id', AttendanceController.getAttendanceByStudent);
// route.get('/class/:id', AttendanceController.getAttendanceByClass);

//create Attendance
route.post('/', AttendanceController.createAttendance);

//delete Attendance
route.delete('/:id', AttendanceController.deleteAttendance);


module.exports = route;