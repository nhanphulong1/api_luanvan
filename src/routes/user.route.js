const express = require('express');
const route = express.Router();
const checkToken = require('../../auth/auth_validation');

const UserController = require('../controllers/user.controller');

//getLogin
route.post('/login', UserController.loginUser);

//get all User
route.get('/', checkToken.checkToken, UserController.getUserList);

//get user to search
route.post('/search', checkToken.checkToken, UserController.getUserSearch);

//get user by id
route.get('/:id', UserController.getUserById);

//get email valid
route.get('/email/:email', UserController.getEmailValid);

//reset pass
route.get('/reset/:id', UserController.getUserById);

//post create user
route.post('/', UserController.createUser);

//Put update user by id
route.put('/:id', UserController.updateUser);

//Delete User by id
route.delete('/:id', UserController.deleteUser);

module.exports = route;