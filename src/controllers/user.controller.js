const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const UserModel = require('../models/user.model');
const PermissionModel = require('../models/permission.model');

const { sign } = require('jsonwebtoken');


// get all user list
exports.getUserList = (req, res) => {
    // console.log('user list here!');
    UserModel.getAllUsers((err, user) => {
        console.log('User list here!');
        //if failue !!
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'User Selected All Successfully!', data: user });
    })
};

//get user by user
exports.getUserByUser = (req, res) => {
    UserModel.getUserByUser(req.params.user, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'User By user Selected Successfully!', data: user });
    })
}

//search User
exports.getUserSearch = (req, res) => {
    var name, email, type;
    (req.body.email == "") ? email = '%%': email = '%' + req.body.email + '%';
    (req.body.name == "") ? name = '%%': name = '%' + req.body.name + '%';
    (req.body.type == "3") ? type = '%%': type = '%' + req.body.type + '%';
    UserModel.getUserSearch(email, name, type, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'User Search Selected Successfully!', data: user });
    })
}

//email valuser
exports.getEmailValuser = (req, res) => {
    UserModel.getUserByEmail(req.params.email, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (user) {
            return res.json({ status: 0 });
        }

        return res.json({ status: 1 });
    })
}

//create new user
exports.createUserStudent = (req, res) => {
    console.log('create new user', req.body);
    const userReqData = new UserModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        var salt = genSaltSync(10);
        userReqData.password = "123456";
        userReqData.password = hashSync(userReqData.password, salt);
        userReqData.type = 0;
        userReqData.authen = 0;
        UserModel.createUser(userReqData, (err, user) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'User Created Successfully!', data: user });
        });
    }
}

//create new user
exports.createUserTeacher = (req, res) => {
    const userReqData = new UserModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        var salt = genSaltSync(10);
        userReqData.password = "123456";
        userReqData.password = hashSync(userReqData.password, salt);
        userReqData.type = 1;
        userReqData.authen = 0;
        UserModel.createUser(userReqData, (err, user) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'User Created Successfully!', data: user });
        });
    }
}

//Reset User by user
exports.updatePassUser = (req, res) => {
    const userReqData = new UserModel(req.body);
    var salt = genSaltSync(10);
    userReqData.password = hashSync(req.body.password, salt);
    UserModel.updatePassUser(req.body.user, userReqData, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Password User Updated Successfully!' });
    });
}

//Authen User
exports.updateAuthenUser = (req, res) => {
    UserModel.updateAuthenUser(req.body.user, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Authen User Updated Successfully!' });
    });
}

//Reset User by user
exports.resetUser = (req, res) => {
    console.log('Reset user by user:', req.body);
    var salt = genSaltSync(10);
    password = hashSync('123456', salt);
    UserModel.resetPassByUser(req.params.user, password, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'User Updated Successfully!' });
    });
}

//Delete User by user
exports.deleteUser = (req, res) => {
    // console.log('delete User here');
    UserModel.deleteUserByUser(req.params.user, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'User Clock Successfully!' });
    });
}

exports.undeleteUser = (req, res) => {
    // console.log('delete User here');
    UserModel.undeleteUserByUser(req.params.user, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'User Unclock Successfully!' });
    });
}

//Login User
exports.loginUser = (req, res) => {
    UserModel.getUserByEmail(req.body.user, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (!user) {
            return res.json({ status: 0, message: "Invaluser email or password!" });
        }
        const result = compareSync(req.body.password, user.password);
        if (result) {
            if (user.isDelete == 1) {
                return res.json({ status: 2, message: "Account clocked!" });
            }
            user.password = undefined;
            user.image = undefined;
            let arr = [];
            PermissionModel.getPermissionByUser(user.user, (err, permission) => {
                permission.forEach(element => {
                    arr.push(element.per_id);
                });
                // console.log(arr);
                user.permission = arr;
                const jsontoken = sign({ result: user }, 'qwe1234', {
                    expiresIn: "4h" //thoi gian ton tai token
                });
                return res.json({ status: 1, message: "Login Successfully!", token: jsontoken });
            })
        } else {
            return res.json({ status: 0, message: "Invalid email or password!" });
        }
    })
}

exports.checkPass = (req, res) => {
    UserModel.getPassUserByUser(req.body.user, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (!user) {
            return res.json({ status: 0, message: "Invalid User!!" });
        }
        // console.log(user[0].password);
        const result = compareSync(req.body.password, user[0].password);
        if (result) {
            return res.json({ status: 1, valid: 1 });
        } else {
            return res.json({ status: 0, valid: 0 });
        }
    })
}