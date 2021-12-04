const express = require('express');
const route = express.Router();

const ExamsController = require('../controllers/exam.controller');

//get Exams by id
route.get('/:id', ExamsController.getExamsById);
route.get('/course/:id', ExamsController.getExamsByCourse);
route.get('/', ExamsController.getAllExams);

//search Exams
route.post('/search', ExamsController.searchExams);

//create Exams
route.post('/', ExamsController.createExams);

//update
route.put('/:id', ExamsController.updateExamsById);

//delete Exams
route.delete('/:id', ExamsController.deleteExams);
module.exports = route;