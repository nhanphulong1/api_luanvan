var dbConn = require('../../config/db.config');

var Day = function(day) {
    this.day_name = day.day_name;
}



//get Day by id
Day.getAllDay = (id, result) => {
    dbConn.query(`Select * FROM Days`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Day', err);
            result(null, err);
        } else {
            console.log('Day fetching successfully');
            result(null, res);
        }
    })
}

module.exports = Day;