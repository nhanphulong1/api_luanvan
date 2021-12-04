const express = require('express');
const route = express.Router();

const RegistersController = require('../controllers/regis.controller');

//get all Registers
route.get('/', RegistersController.getRegistersList);

//search regis
route.post('/search', RegistersController.getRegisterSearch);

//update resgis
route.get('/update/:id', RegistersController.updateRegisters);

//post create Registers
route.post('/', RegistersController.createRegisters);

//Put update Registers by id
// route.put('/:id', RegistersController.updateRegisters);

//Delete Registers by id
route.delete('/:id', RegistersController.deleteRegisters);

module.exports = route;