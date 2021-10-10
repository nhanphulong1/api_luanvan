const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const UserModel = require('../models/user.model');

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

//get user by ID
exports.getUserById = (req, res) => {
    console.log('get user by Id');
    UserModel.getUserById(req.params.id, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'User By Id Selected Successfully!', data: user });
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

//email valid
exports.getEmailValid = (req, res) => {
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
exports.createUser = (req, res) => {
    console.log('create new user', req.body);
    const userReqData = new UserModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        var salt = genSaltSync(10);
        userReqData.password = "123456";
        userReqData.password = hashSync(userReqData.password, salt);
        UserModel.createUser(userReqData, (err, user) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'User Created Successfully!', data: user });
        });
    }
}


//Update User by id
exports.updateUser = (req, res) => {
    console.log('update user by id:', req.body);
    const userReqData = new UserModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        UserModel.updateUserById(req.params.id, userReqData, (err, user) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'User Updated Successfully!' });
        });
    }
}

//Reset User by id
exports.resetUser = (req, res) => {
    console.log('Reset user by id:', req.body);
    var salt = genSaltSync(10);
    password = hashSync('123456', salt);
    UserModel.updateUserById(req.params.id, password, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'User Updated Successfully!' });
    });
}

//Delete User by id
exports.deleteUser = (req, res) => {
    // console.log('delete User here');
    UserModel.deleteUserById(req.params.id, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'User Deleted Successfully!' });
    });
}

//Login User
exports.loginUser = (req, res) => {
    UserModel.getUserByEmail(req.body.email, (err, user) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (!user) {
            return res.json({ status: 0, message: "Invalid email or password!" });
        }
        const result = compareSync(req.body.password, user.password);
        if (result) {
            user.password = undefined;
            user.image = undefined;
            const jsontoken = sign({ result: user }, 'qwe1234', {
                expiresIn: "1h" //thoi gian ton tai token
            });
            return res.json({ status: 1, message: "Login Successfully!", token: jsontoken });
        } else {
            return res.json({ status: 0, message: "Invalid email or password!" });
        }
    })
}