const express = require('express');
const route = express.Router();

const ResultController = require('../controllers/result.controller');


//Get Result by id
route.get('/:id', ResultController.getResultById);

//Create Result
route.post('/', ResultController.createResult);
route.post('/arr', ResultController.createMultiResult);

// Update Result
route.put('/:id', ResultController.updateResult);

//Delete Result
route.delete('/:id', ResultController.deleteResult);

module.exports = route;