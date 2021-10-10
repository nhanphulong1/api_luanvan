var dbConn = require('../../config/db.config');

var Location = function(location) {
    this.loc_name = location.loc_name;
    this.loc_address = location.loc_address;
}



//get Location by id
Location.getAllLocation = (id, result) => {
    dbConn.query(`Select * FROM Locations`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Location', err);
            result(null, err);
        } else {
            console.log('Location fetching successfully');
            result(null, res);
        }
    })
}

module.exports = Location;