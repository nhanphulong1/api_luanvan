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

//get student by ID
exports.getStudentById = (req, res) => {
    StudentModel.getStudentById(req.params.id, (err, student) => {
        if (err)
            return res.status(500).json({ status: 0, message: err });
        res.json({ status: 1, message: 'Student Seleted Successfully!', data: student });
    })
}

exports.getStudentSearch = (req, res) => {
    var name, phone, address;
    (req.body.phone == "") ? phone = '%%': phone = '%' + req.body.phone + '%';
    (req.body.name == "") ? name = '%%': name = '%' + req.body.name + '%';
    (req.body.address == "") ? address = '%%': address = '%' + req.body.address + '%';
    StudentModel.getStudentSearch(name, phone, address, (err, student) => {
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
        StudentModel.createStudent(StudentReq, (err, student) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Create Student Successfully!', data: student });
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