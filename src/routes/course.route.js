const express = require('express');
const route = express.Router();

const CourseController = require('../controllers/Course.controller');

//get all Course
route.get('/', CourseController.getCourseList);

//get Course by id
route.get('/name/:name', CourseController.getCourseByName);

//get Course by id
route.get('/:id', CourseController.getCourseById);


//post create Course
route.post('/', CourseController.createCourse);

//Put update Course by id
route.put('/:id', CourseController.updateCourse);

//Delete Course by id
route.delete('/:id', CourseController.deleteCourse);

module.exports = route;