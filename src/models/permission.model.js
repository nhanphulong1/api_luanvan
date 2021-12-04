var dbConn = require('../../config/db.config');

var Permission = function(permission) {
    this.id = permission.id;
    this.per_id = permission.per_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

Permission.getAllPermission = (result) => {
    dbConn.query('SELECT * FROM Permissions', (err, res) => {
        if (err) {
            console.log('Error while fetching permission data');
            result(err, null);
        } else {
            console.log('Permission Selected successfully!');
            result(null, res)
        }
    });
}

Permission.getPermissionByUser = (user, result) => {
    dbConn.query(`SELECT p.per_id FROM Permissions p
        JOIN Permission_detail pe on p.per_id = pe.per_id
        WHERE user = ?`, user, (err, res) => {
        if (err) {
            console.log('Error while fetching permission data');
            result(err, null);
        } else {
            console.log('Permission Selected successfully!');
            result(null, res)
        }
    });
}



//create
Permission.createPermission = (user, per_id, result) => {
    dbConn.query('INSERT INTO Permission_detail SET user=?,per_id=? ', [user, per_id], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res)
        }
    });
}

// delete
Permission.deletePermission = (per, user, result) => {
    dbConn.query(`DELETE FROM Permission_detail 
    where per_id NOT IN (?) AND user =?`, [per, user], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

module.exports = Permission;