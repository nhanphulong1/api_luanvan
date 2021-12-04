const express = require('express');
const route = express.Router();
const checkToken = require('../../auth/auth_validation');

const UserController = require('../controllers/user.controller');

//getLogin
route.post('/login', UserController.loginUser);
//check Password
route.post('/checkpass', UserController.checkPass);

//get all User
route.get('/', checkToken.checkToken, UserController.getUserList);

//get user to search
route.post('/search', checkToken.checkToken, UserController.getUserSearch);

//get user by id
route.get('/:user', UserController.getUserByUser);

//get email valid
route.get('/email/:email', UserController.getEmailValuser);

//reset pass
route.get('/reset/:user', UserController.resetUser);

//post create user
route.post('/student', UserController.createUserStudent);
route.post('/teacher', UserController.createUserTeacher);

//Put update user by id
route.put('/pass', UserController.updatePassUser);
route.put('/authen', UserController.updateAuthenUser);

//Delete User by id
route.delete('/:user', UserController.deleteUser);
route.delete('/unlock/:user', UserController.undeleteUser);

module.exports = route;