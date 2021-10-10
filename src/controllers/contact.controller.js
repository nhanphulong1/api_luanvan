const ContactModel = require('../models/Contact.model');

//Get all Contact
exports.getContactList = (req, res) => {
    ContactModel.getAllContacts((err, Contact) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Contact Seleted Successfully!', data: Contact });
    })
}

//get Contact by ID
exports.getContactById = (req, res) => {
    ContactModel.getContactById(req.params.id, (err, Contact) => {
        if (err)
            return res.status(500).json({ status: 0, message: err });
        res.json({ status: 1, message: 'Contact Seleted Successfully!', data: Contact });
    })
}

//create Contact
exports.createContact = (req, res) => {
    var ContactReq = new ContactModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ContactModel.createContact(ContactReq, (err, Contact) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Create Contact Successfully!', data: Contact });
        });
    }
}


//Update Contact
// exports.updateContact = (req, res) => {
//     var ContactReq = new ContactModel(req.body);
//     if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
//         return req.send(400).send({ status: 0, message: 'Please fill all fields' });
//     } else {
//         ContactModel.updateContact(req.params.id, ContactReq, (err, Contact) => {
//             if (err) {
//                 return res.status(500).json({ status: 0, message: err });
//             }
//             res.json({ status: 1, message: 'Updated Contact Successfully!' });
//         });
//     }
// }

//Delete Contact
exports.deleteContact = (req, res) => {
    ContactModel.deleteContact(req.params.id, (err, Contact) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Contact Deleted Successfully!' });
    });
}