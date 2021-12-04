var dbConn = require('../../config/db.config');

var Configs = function(configs) {
    this.c_name = configs.c_name;
    this.c_email = configs.c_email;
    this.c_pass = configs.c_pass;
    this.c_address = configs.c_address;
    this.c_phone = configs.c_phone;
    this.c_facebook = configs.c_facebook;
}

//get Configs
Configs.getConfigs = (result) => {
    dbConn.query(`Select * From Configs`, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
}

//update Configs
Configs.updateConfigsById = (ConfigsReq, result) => {
    dbConn.query(`UPDATE Configs SET c_name=?,c_email=?,c_pass=?,c_phone=?,c_address=?,c_facebook=?`, [ConfigsReq.c_name, ConfigsReq.c_email, ConfigsReq.c_pass, ConfigsReq.c_phone, ConfigsReq.c_address, ConfigsReq.c_facebook], (err, res) => {
        if (err) {
            console.log('Error while fetching Configs', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = Configs;