const express = require('express');
const route = express.Router();

const ClassController = require('../controllers/Class.controller');

//get all Class
route.get('/', ClassController.getClassList);

//get class teacher null
route.get('/teacher/null', ClassController.getClassIsTeacherNullList);

//get Class by id
route.get('/:id', ClassController.getClassById);

//get Class by id
route.get('/teacher/:id', ClassController.getClassByTeacher);

//get count class
route.get('/count/1', ClassController.getCountClass);

//get Class by id
route.get('/stu/:id', ClassController.getClassByStudent);

//get student in class
route.get('/student/:id', ClassController.getStudentByClass);

//get class by course
route.get('/course/:id', ClassController.getClassByCourse);

//check quantity class
route.get('/check/:id', ClassController.checkClass);

//search class
route.post('/search', ClassController.getSearchClass);

//post create Class
route.post('/', ClassController.createClass);

//Put update Class by id
route.put('/:id', ClassController.updateClass);


//complete class
route.put('/complete/:id', ClassController.completeClass);
route.put('/com/:id', ClassController.comClassById);

//Delete Class by id
route.delete('/:id', ClassController.deleteClass);

module.exports = route;