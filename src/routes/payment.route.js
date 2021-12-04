const express = require('express');
const route = express.Router();

const PaymentController = require('../controllers/payment.controller');

route.get('/:id', PaymentController.getPayment);

//post create Payment
route.post('/', PaymentController.createPayment);

//update
route.put('/:id', PaymentController.updatePayment);

//delete
route.delete('/:id', PaymentController.deletePayment);

module.exports = route;