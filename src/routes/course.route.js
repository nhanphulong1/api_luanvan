const express = require('express');
const route = express.Router();

const CourseController = require('../controllers/Course.controller');

//get all Course
route.get('/', CourseController.getCourseList);

//check class by course
route.get('/check_class/:id', CourseController.checkClassValid);

//get statistic
route.get('/statistic', CourseController.getStatistic);
route.get('/statistic/result', CourseController.getStatisticByResult);
route.get('/statistic/countStudent', CourseController.getStatisticByCountStudent);
route.get('/statistic/course/:name', CourseController.getStatisticByCourse);
route.get('/statistic/result/:name', CourseController.getStatisticResultByCourse);

//Thống kê theo học viên
route.post('/statistic1', CourseController.getStatistic1);

//Thống kê theo lớp học
route.post('/statistic2', CourseController.getStatistic2);

//Thống kê theo Lịch thi
route.post('/statistic3', CourseController.getStatistic3);

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