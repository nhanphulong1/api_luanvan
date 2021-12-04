const StudentModel = require('../models/student.model');

//Get all Student
exports.getStudentList = (req, res) => {
    StudentModel.getAllStudents((err, student) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Student Seleted Successfully!', data: student });
    })
}

//check class valid by student
exports.checkClassValid = (req, res) => {
    let StudentReq = req.body;
    StudentModel.checkStudent(StudentReq, (err, student) => {
        // console.log('student list here!');
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (student.length == 0) {
            return res.json({ status: 1, valid: 1 });
        }
        return res.json({ status: 1, valid: 0 });
    })
};

//get student by ID
exports.getStudentById = (req, res) => {
    StudentModel.getStudentById(req.params.id, (err, student) => {
        if (err)
            return res.status(500).json({ status: 0, message: err });
        res.json({ status: 1, message: 'Student Seleted Successfully!', data: student });
    })
}

//get student by ID
exports.getCountStudent = (req, res) => {
    StudentModel.getCountStudents((err, student) => {
        if (err)
            return res.status(500).json({ status: 0, message: err });
        res.json({ status: 1, data: student[0].stu_number });
    })
}

exports.getStudentSearch = (req, res) => {
    var name, cou_id, type;
    (req.body.cou_id == "") ? cou_id = '%%': cou_id = req.body.cou_id;
    (req.body.name == "") ? name = '%%': name = '%' + req.body.name + '%';
    (req.body.type == "-1") ? type = '%%': type = req.body.type;
    StudentModel.getStudentSearch(name, cou_id, type, (err, student) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Student Search Selected Successfully!', data: student });
    })
}

//create student
exports.createStudent = (req, res) => {
    var StudentReq = new StudentModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log("123");
        StudentModel.getAllStudentDelete((err, student) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            var code = +student[0].stu_code.slice(2) + 1;
            code = code + '';
            console.log('code: ', code);
            while (code.length < 6) {
                code = '0' + code;
            }
            StudentReq.stu_code = 'HV' + code;
            StudentModel.createStudent(StudentReq, (err, student) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json({ status: 1, message: 'Create Student Successfully!', data: student });
            });
        });
    }
}


//Update student
exports.updateStudent = (req, res) => {
    var StudentReq = new StudentModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        StudentModel.updateStudent(req.params.id, StudentReq, (err, student) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Updated Student Successfully!' });
        });
    }
}

//Delete Student
exports.deleteStudent = (req, res) => {
    StudentModel.deleteStudent(req.params.id, (err, student) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Student Deleted Successfully!' });
    });
}