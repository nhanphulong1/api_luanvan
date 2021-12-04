const express = require('express');
const route = express.Router();

const MailController = require('../controllers/mail.controller');

//post create Payment
route.post('/create/user', MailController.createUser);
route.post('/create/teacher', MailController.createTeacher);

//send mail assignment
route.post('/assignment', MailController.createMailAssignment);


//send mail contact
route.post('/contact', MailController.createMailContact);

module.exports = route;