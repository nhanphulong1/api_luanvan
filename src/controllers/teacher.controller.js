const TeacherModel = require('../models/teacher.model');


// get all Teacher list
exports.getTeacherList = (req, res) => {
    // console.log('Teacher list here!');
    TeacherModel.getAllTeachers((err, teacher) => {
        console.log('Teacher list here!');
        //if failue !!
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        //Query seccessfully!
        res.json({ status: 1, message: 'Teacher Selected Successfully!', data: teacher });
    })
};

// get all Teacher list
exports.getCountTeacher = (req, res) => {
    TeacherModel.getCountTeachers((err, teacher) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        res.json({ status: 1, data: teacher[0].tea_number });
    })
};

//get Teacher by ID
exports.getTeacherById = (req, res) => {
    console.log('get Teacher by Id');
    TeacherModel.getTeacherById(req.params.id, (err, teacher) => {
        if (err)
            return res.status(500).json({ status: 0, message: err });
        res.json({ status: 1, message: 'Teacher Selected Successfully!', data: teacher });
    })
}

exports.getTeacherSearch = (req, res) => {
    var name, email, type;
    (req.body.email == "") ? email = '%%': email = '%' + req.body.email + '%';
    (req.body.name == "") ? name = '%%': name = '%' + req.body.name + '%';
    type = req.body.type;
    TeacherModel.getTeacherSearch(email, name, type, (err, teacher) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Teacher Search Selected Successfully!', data: teacher });
    })
}

//check class valid by teacher
exports.checkTeacherValid = (req, res) => {
    TeacherModel.checkTeacher(req.params.email, req.params.phone, (err, teacher) => {
        // console.log('teacher list here!');
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (teacher.length == 0) {
            return res.json({ status: 1, valid: 1 });
        }
        return res.json({ status: 1, valid: 0 });
    })
};

//create new Teacher
exports.createTeacher = (req, res) => {
    const TeacherReqData = new TeacherModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        TeacherModel.getFullTeachers((err, teacher) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            var code = +teacher[0].tea_code.slice(2) + 1;
            code = code + '';
            console.log('code: ', code);
            while (code.length < 6) {
                code = '0' + code;
            }
            TeacherReqData.tea_code = 'GV' + code;
            TeacherModel.createTeacher(TeacherReqData, (err, teacher) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                res.json({ status: 1, message: 'Teacher Created Successfully!', data: teacher });
            });
        })
    }
}


//Update Teacher by id
exports.updateTeacher = (req, res) => {
    const TeacherReqData = new TeacherModel(req.body);
    console.log('update Teacher by id:', TeacherReqData);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        TeacherModel.updateTeacherById(req.params.id, TeacherReqData, (err, teacher) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Teacher Updated Successfully!' });
        });
    }
}

//Delete Teacher by id
exports.deleteTeacher = (req, res) => {
    TeacherModel.deleteTeacherById(req.params.id, (err, teacher) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Teacher Deleted Successfully!' });
    });
}