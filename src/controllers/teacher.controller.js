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

//create new Teacher
exports.createTeacher = (req, res) => {
    console.log('create new Teacher', req.body);
    const TeacherReqData = new TeacherModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        TeacherModel.createTeacher(TeacherReqData, (err, teacher) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Teacher Created Successfully!', data: teacher });
        });
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
                return res.status(500).json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Teacher Updated Successfully!' });
        });
    }
}

//Delete Teacher by id
exports.deleteTeacher = (req, res) => {
    console.log('delete Teacher here');
    TeacherModel.deleteTeacherById(req.params.id, (err, teacher) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Teacher Deleted Successfully!' });
    });
}