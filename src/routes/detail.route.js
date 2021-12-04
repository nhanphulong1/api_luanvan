const express = require('express');
const route = express.Router();

const DetailController = require('../controllers/Detail.controller');

// //get all Detail
// route.get('/', DetailController.getDetailList);

//get Detail by id
route.get('/:id', DetailController.getDetailById);

//get Detail by id
route.get('/check/:id', DetailController.checkValidDetail);

//post create Detail
route.post('/', DetailController.createDetail);

//Put update Detail by id
route.put('/:id', DetailController.updateDetail);

//Delete Detail by id
route.delete('/:id', DetailController.deleteDetail);

module.exports = route;