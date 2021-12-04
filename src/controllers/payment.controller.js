const PaymentModel = require('../models/payment.model');

//get Payment
exports.getPayment = (req, res) => {
    PaymentModel.getPaymentById(req.params.id, (err, payment) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Payment Selected Successfully!', data: payment });
    })
}

//create new Payment
exports.createPayment = (req, res) => {
    console.log('create new Payment', req.body);
    const PaymentReqData = new PaymentModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        if (PaymentReqData.pay_date == null) {
            PaymentReqData.pay_date = PaymentReqData.created_at;
        }
        PaymentModel.createPayment(PaymentReqData, (err, Payment) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Payment Created Successfully!', data: Payment });
        });
    }
}

//update new Payment
exports.updatePayment = (req, res) => {
    const PaymentReqData = new PaymentModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        PaymentModel.updatePayment(req.params.id, PaymentReqData, (err, Payment) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Payment Updated Successfully!' });
        });
    }
}

//Delete Payments
exports.deletePayment = (req, res) => {
    PaymentModel.deletePayment(req.params.id, (err, payment) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Payment Deleted Successfully!' });
    })
}