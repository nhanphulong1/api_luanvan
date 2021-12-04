var dbConn = require('../../config/db.config');

var Notification = function(notification) {
    this.no_title = notification.no_title;
    this.no_content = notification.no_content;
    this.cla_id = notification.cla_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

Notification.getNotificationByClass = (cla_id, result) => {
    dbConn.query('SELECT * FROM Notifications WHERE cla_id = ? ORDER BY no_id DESC', cla_id, (err, res) => {
        if (err) {
            console.log('Error while fetching Notification data');
            result(err, null);
        } else {
            console.log('Notification Selected successfully!');
            result(null, res)
        }
    });
}

Notification.getNotificationById = (id, result) => {
    dbConn.query(`SELECT * FROM Notifications
        WHERE no_id = ?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Notification data');
            result(err, null);
        } else {
            console.log('Notification Selected successfully!');
            result(null, res)
        }
    });
}



//create
Notification.createNotification = (NotifiReq, result) => {
    dbConn.query('INSERT INTO Notifications SET ?', [NotifiReq], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res)
        }
    });
}

//update
Notification.updateNotification = (id, NotifiReq, result) => {
    dbConn.query('UPDATE Notifications SET no_title=?,no_content=?,updated_at=? WHERE no_id = ?', [NotifiReq.no_title, NotifiReq.no_content, NotifiReq.updated_at, id], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res)
        }
    });
}

// delete
Notification.deleteNotification = (id, result) => {
    dbConn.query(`DELETE FROM Notifications
    where no_id = ?`, id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

module.exports = Notification;