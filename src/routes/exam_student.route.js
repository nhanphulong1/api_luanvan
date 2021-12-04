const express = require('express');
const route = express.Router();

const ExamStudentController = require('../controllers/exam_student.controller');

//get Student by Exams
route.get('/:id', ExamStudentController.getStudentByExams);

//get Student by course
route.get('/course/:id', ExamStudentController.getStudentByCourses);

//create Exams
route.post('/', ExamStudentController.createExamStudent);

// //update
// route.put('/:id', ExamStudentController.updateExamsById);

// //delete Exams
// route.delete('/:id', ExamStudentController.deleteExams);
module.exports = route;