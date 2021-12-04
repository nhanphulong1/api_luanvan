var dbConn = require('../../config/db.config');

var User = function(user) {
    this.user = user.user;
    this.password = user.password;
    this.type = user.type;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all users
User.getAllUsers = (result) => {
    dbConn.query(`select *, if(type = 1, tea_name, stu_name) as name, if(type = 1, tea_image, stu_image) as image  from users u
    left join students s on u.user = s.stu_code
    left join teachers t on u.user = t.tea_code
    `, (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(err, null);
        } else {
            console.log('Users fetching successfully');
            result(null, res);
        }
    })
}

//get user by User
User.getUserByUser = (User, result) => {
    dbConn.query(`select *, if(type = 1, tea_name, stu_name) as name, if(type = 1, tea_image, stu_image) as image  from users u
    left join students s on u.user = s.stu_code
    left join teachers t on u.user = t.tea_code
    Where User = ? AND isDelete != 1`, User, (err, res) => {
        if (err) {
            console.log('Error while fetching user by User', err);
            result(err, null);
        } else {
            console.log('User by User fetching successfully');
            result(null, res);
        }
    })
}

//get user by User
User.getPassUserByUser = (user, result) => {
    dbConn.query(`select password from Users
    Where user = ? AND isDelete != 1`, user, (err, res) => {
        if (err) {
            console.log('Error while fetching user by User', err);
            result(err, null);
        } else {
            console.log('User by User fetching successfully');
            result(null, res);
        }
    })
}

//get user search
User.getUserSearch = (email, name, type, result) => {
    dbConn.query(`select *, if(stu_name is null, tea_name, stu_name) as name, if(stu_name is null, tea_image, stu_image) as image  from users u
    left join students s on u.user = s.stu_code
    left join teachers t on u.user = t.tea_code
    where user LIKE ? AND (stu_name LIKE ? OR tea_name LIKE ?) AND type LIKE ?`, [email, name, name, type], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get user by email
User.getUserByEmail = (user, result) => {
    console.log('user: ', user);
    dbConn.query(`SELECT * FROM users where user = ?`, user, (err, res) => {
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
            console.log('Error while inserting data', err);
            result(err, null);
        } else {
            console.log('User created successfully!');
            result(null, res)
        }
    })
}


//update user by User
User.updatePassUser = (User, userReqData, result) => {
    dbConn.query('UPDATE users SET password=?,updated_at=? WHERE User = ?', [userReqData.password, userReqData.updated_at, User], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('User updated successfully!');
            result(null, res);
        }
    })
};

//update user by User
User.updateAuthenUser = (User, result) => {
    dbConn.query('UPDATE users SET authen=1 WHERE User = ?', [User], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('User Authen updated successfully!');
            result(null, res);
        }
    })
};

//reset password by User
User.resetPassByUser = (user, password, result) => {
    dbConn.query('UPDATE users SET password=? WHERE user = ?', [password, user], (err, res) => {
        if (err) {
            console.log('Error while reseting data');
            result(err, null);
        } else {
            console.log('User reset successfully!');
            result(null, res);
        }
    })
};

//Delete User by User
User.deleteUserByUser = (User, result) => {
    console.log(User);
    dbConn.query('UPDATE users SET isDelete=1 WHERE User = ? ', [User], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('User Deleted successfully!');
            result(null, res)
        }
    });
}

User.undeleteUserByUser = (User, result) => {
    console.log(User);
    dbConn.query('UPDATE users SET isDelete=0 WHERE User = ? ', [User], (err, res) => {
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