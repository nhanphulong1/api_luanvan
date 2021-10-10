var dbConn = require('../../config/db.config');

var Contact = function(Contact) {
    this.con_name = Contact.con_name;
    this.con_email = Contact.con_email;
    this.con_phone = Contact.con_phone;
    this.con_title = Contact.con_title;
    this.con_content = Contact.con_content;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all Contact
Contact.getAllContacts = (result) => {
    dbConn.query('SELECT * FROM Contacts', (err, res) => {
        if (err) {
            console.log('Error while fetching Contact!');
            result(err, null);
        } else {
            console.log('Fetching Contact Successfully');
            result(null, res);
        }
    });
}

//get Contact by id
Contact.getContactById = (id, result) => {
    dbConn.query('SELECT * FROM Contacts WHERE con_id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching Contact by id!');
            result(err, null);
        } else {
            console.log('Fetching Contact By ID Successfully');
            result(null, res);
        }
    });
}

//Create Contact
Contact.createContact = (ContactReq, result) => {
    dbConn.query('INSERT INTO Contacts SET ? ', ContactReq, (err, res) => {
        if (err) {
            console.log('Error while inserting Contact data');
            result(err, null);
        } else {
            console.log('Contact created successfully!');
            result(null, res)
        }
    });
}

//Update Contact by id
// Contact.updateContact = (id, ContactReq, result) => {
//     dbConn.query('UPDATE Contacts SET stu_name=?,stu_email=?,stu_address=?,stu_birthday=?,stu_phone=?,stu_gender=?,stu_cmnd=?,stu_image=?,updated_at=? WHERE stu_id = ?', [ContactReq.stu_name, ContactReq.stu_email, ContactReq.stu_address, ContactReq.stu_birthday, ContactReq.stu_phone, ContactReq.stu_gender, ContactReq.stu_cmnd, ContactReq.stu_image, ContactReq.updated_at, id], (err, res) => {
//         if (err) {
//             console.log('Error while updating Contact');
//             result(err, null);
//         } else {
//             console.log('Updated Contact Successfully!');
//             result(null, res);
//         }
//     })
// }

//Delete Contact by id
Contact.deleteContact = (id, result) => {
    dbConn.query('DELETE FROM Contacts WHERE con_id = ? ', id, (err, res) => {
        if (err) {
            console.log('Error while delete Contact');
            result(err, null);
        } else {
            console.log('Deleted Contact Successfully');
            result(null, res);
        }

    })
}

module.exports = Contact;