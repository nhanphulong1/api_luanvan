const express = require('express');
const route = express.Router();

const TeacherController = require('../controllers/teacher.controller');

//get all Teacher
route.get('/', TeacherController.getTeacherList);

//get Teacher by id
route.get('/:id', TeacherController.getTeacherById);

//search teacher
route.post('/search', TeacherController.getTeacherSearch);

//post create Teacher
route.post('/', TeacherController.createTeacher);

//Put update Teacher by id
route.put('/:id', TeacherController.updateTeacher);

//Delete Teacher by id
route.delete('/:id', TeacherController.deleteTeacher);

module.exports = route;