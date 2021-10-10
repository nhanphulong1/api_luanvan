var dbConn = require('../../config/db.config');

var User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.address = user.address;
    this.image = user.image;
    this.phone = user.phone;
    this.position = user.position;
    this.type = user.type;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all users
User.getAllUsers = (result) => {
    dbConn.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(err, null);
        } else {
            console.log('Users fetching successfully');
            result(null, res);
        }
    })
}

//get user by id
User.getUserById = (id, result) => {
    dbConn.query('SELECT * FROM users Where id = ?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching user by id', err);
            result(err, null);
        } else {
            console.log('User by id fetching successfully');
            result(null, res);
        }
    })
}

//get user search
User.getUserSearch = (email, name, type, result) => {
    dbConn.query("SELECT * FROM users where email LIKE ? AND name LIKE ? AND type LIKE ?", [email, name, type], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get user by email
User.getUserByEmail = (email, result) => {
    dbConn.query('SELECT * FROM users where email = ?', email, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res[0]);
        }
    })
}


//create new User
User.createUser = (userReqData, result) => {
    dbConn.query('INSERT INTO users SET ? ', userReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('User created successfully!');
            result(null, res)
        }
    })
}


//update user by id
User.updateUserById = (id, userReqData, result) => {
    dbConn.query('UPDATE users SET name=?,email=?,address=?,phone=?,position=?,type=?,image=?,updated_at=? WHERE id = ?', [userReqData.name, userReqData.email, userReqData.address, userReqData.phone, userReqData.position, userReqData.type,
        userReqData.image, userReqData.updated_at, id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('User updated successfully!');
            result(null, res);
        }
    })
};

//reset password by id
User.resetPassById = (id, password, result) => {
    dbConn.query('UPDATE users SET password=? WHERE id = ?', [password, id], (err, res) => {
        if (err) {
            console.log('Error while reseting data');
            result(err, null);
        } else {
            console.log('User reset successfully!');
            result(null, res);
        }
    })
};

//Delete User by id
User.deleteUserById = (id, result) => {
    dbConn.query('DELETE FROM users WHERE id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('User Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = User;