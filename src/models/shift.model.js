var dbConn = require('../../config/db.config');

var Shift = function(shift) {
    this.shi_id = shift.shi_id;
    this.shi_start = shift.shi_start;
    this.shi_end = shift.shi_end;
}



//get Shift by id
Shift.getAllShift = (id, result) => {
    dbConn.query(`Select * FROM Shifts`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Shift', err);
            result(null, err);
        } else {
            console.log('Shift fetching successfully');
            result(null, res);
        }
    })
}

module.exports = Shift;