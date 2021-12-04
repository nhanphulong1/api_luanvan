var dbConn = require('../../config/db.config');

var Payment = function(Payment) {
    this.de_id = Payment.de_id;
    this.pay_id = Payment.pay_id;
    this.pay_type = Payment.pay_type;
    this.pay_date = Payment.pay_date;
    this.user_id = Payment.user_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get Payment by id
Payment.getPaymentById = (id, result) => {
    dbConn.query('SELECT * From payments WHERE de_id = ?', id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

Payment.createPayment = (data, result) => {
    dbConn.query('INSERT INTO payments SET ? ', data, (err, res) => {
        if (err) {
            console.log('Error while inserting payment data');
            result(err, null);
        } else {
            console.log('Payments created successfully!');
            result(null, res)
        }
    });
}

Payment.updatePayment = (id, data, result) => {
    dbConn.query('UPDATE payments SET pay_type=?,pay_id=?,pay_date=?,user_id=?,updated_at=? WHERE de_id=? ', [data.pay_type, data.pay_id, data.pay_date, data.user_id, data.updated_at, id], (err, res) => {
        if (err) {
            console.log('Error while updating payment data', err);
            result(err, null);
        } else {
            console.log('Payments updated successfully!');
            result(null, res)
        }
    });
}

Payment.deletePayment = (id, result) => {
    dbConn.query('DELETE FROM payments WHERE de_id = ? ', id, (err, res) => {
        if (err) {
            console.log('Error while deleting payment data', err);
            result(err, null);
        } else {
            console.log('Payments deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Payment;