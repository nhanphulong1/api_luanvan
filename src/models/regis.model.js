var dbConn = require('../../config/db.config');

var Registers = function(register) {
    this.res_name = register.res_name;
    this.res_email = register.res_email;
    this.res_phone = register.res_phone;
    this.res_type = register.res_type;
    this.res_status = register.res_status;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all Registers
Registers.getAllRegisters = (result) => {
    dbConn.query('SELECT * FROM Registers', (err, res) => {
        if (err) {
            console.log('Error while fetching Registers', err);
            result(null, err);
        } else {
            console.log('Registers fetching successfully');
            result(null, res);
        }
    })
}

//get regis search
Registers.getRegisterSearch = (email, type, status, result) => {
    dbConn.query("SELECT * FROM Registers where res_name LIKE ? AND res_type LIKE ? AND res_status LIKE ?", [email, type, status], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//create new Registers
Registers.createRegisters = (RegistersReqData, result) => {
    dbConn.query('INSERT INTO Registers SET ? ', RegistersReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('Registers created successfully!');
            result(null, res)
        }
    })
}


// update Registers by id
Registers.updateRegistersById = (id, result) => {
    var date = new Date();
    dbConn.query('UPDATE Registers SET res_status=1,updated_at=? WHERE res_id = ?', [date,
        id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Registers updated successfully!');
            result(null, res);
        }
    })
};

//Delete Registers by id
Registers.deleteRegistersById = (id, result) => {
    dbConn.query('DELETE FROM Registers WHERE res_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Registers Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Registers;