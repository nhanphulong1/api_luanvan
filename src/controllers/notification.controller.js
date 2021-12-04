const NotificationModel = require('../models/notification.model');

//Get all Notification
exports.getNotificationByClass = (req, res) => {
    NotificationModel.getNotificationByClass(req.params.id, (err, Notification) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Notification Seleted Successfully!', data: Notification });
    })
}

//get Notification by ID
exports.getNotificationById = (req, res) => {
    NotificationModel.getNotificationById(req.params.id, (err, Notification) => {
        if (err)
            return res.json({ status: 0, message: err });
        res.json({ status: 1, message: 'Notification Seleted Successfully!', data: Notification });
    })
}

//create Notification
exports.createNotification = (req, res) => {
    console.log(req.body);
    let NotificationReq = new NotificationModel(req.body);
    console.log(NotificationReq);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        NotificationModel.createNotification(NotificationReq, (err, Notification) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Create Notification Successfully!', data: Notification });
        });
    }
}


//Update Notification
exports.updateNotification = (req, res) => {
    var NotificationReq = new NotificationModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        NotificationModel.updateNotification(req.params.id, NotificationReq, (err, Notification) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Updated Notification Successfully!' });
        });
    }
}

//Delete Notification
exports.deleteNotification = (req, res) => {
    NotificationModel.deleteNotification(req.params.id, (err, Notification) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Notification Deleted Successfully!' });
    });
}