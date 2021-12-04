const express = require('express');
const route = express.Router();

const NotificationController = require('../controllers/notification.controller');

//Get all Notification
route.get('/class/:id', NotificationController.getNotificationByClass);

//Get Notification by id
route.get('/:id', NotificationController.getNotificationById);

//Create Notification
route.post('/', NotificationController.createNotification);

//Update Notification
route.put('/:id', NotificationController.updateNotification);

//Delete Notification
route.delete('/:id', NotificationController.deleteNotification);

module.exports = route;