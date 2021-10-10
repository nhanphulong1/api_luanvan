const express = require('express');
const route = express.Router();

const ClassController = require('../controllers/Class.controller');

//get all Class
route.get('/', ClassController.getClassList);

//get Class by id
route.get('/:id', ClassController.getClassById);

//get Class by id
route.get('/teacher/:id', ClassController.getClassByTeacher);

//get student in class
route.get('/student/:id', ClassController.getClassByTeacher);

//get class by course
route.get('/course/:id', ClassController.getClassByCourse);

//search class
route.post('/search', ClassController.getSearchClass);

//post create Class
route.post('/', ClassController.createClass);

//Put update Class by id
route.put('/:id', ClassController.updateClass);

//complete class
route.put('/complete/:id', ClassController.completeClass);

//Delete Class by id
route.delete('/:id', ClassController.deleteClass);

module.exports = route;