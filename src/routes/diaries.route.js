const express = require('express');
const route = express.Router();

const DiariesController = require('../controllers/diaries.controller');

//get Diaries by id
route.get('/:id', DiariesController.getDiariesById);
route.get('/teacher/:id', DiariesController.getDiariesByTeacher);
route.get('/class/:id', DiariesController.getDiariesByClass);

//create Diaries
route.post('/', DiariesController.createDiaries);

//update
route.put('/:id', DiariesController.updateStatusDiaries);

//delete Diaries
route.delete('/:id', DiariesController.deleteDiaries);
module.exports = route;