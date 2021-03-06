const express = require('express');
const route = express.Router();

const StudentController = require('../controllers/student.controller');

//Get all student
route.get('/', StudentController.getStudentList);

//Get student by id
route.get('/:id', StudentController.getStudentById);

//get count student
route.get('/count/1', StudentController.getCountStudent);

//check student
route.post('/check', StudentController.checkClassValid);

//search student
route.post('/search', StudentController.getStudentSearch);

//Create student
route.post('/', StudentController.createStudent);

//Update student
route.put('/:id', StudentController.updateStudent);

//Delete student
route.delete('/:id', StudentController.deleteStudent);

module.exports = route;