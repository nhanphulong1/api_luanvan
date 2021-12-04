const express = require('express');
const route = express.Router();

const ContactController = require('../controllers/Contact.controller');

//Get all Contact
route.get('/', ContactController.getContactList);

//Get Contact by id
route.get('/:id', ContactController.getContactById);

//Get count Contact
route.get('/count/1', ContactController.getCountContact);

//Create Contact
route.post('/', ContactController.createContact);

//Update Contact
route.put('/:id', ContactController.updateContact);

//Delete Contact
route.delete('/:id', ContactController.deleteContact);

module.exports = route;