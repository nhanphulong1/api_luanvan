const ClassModel = require('../models/Class.model');


// get all Class list
exports.getClassList = (req, res) => {
    // console.log('Class list here!');
    ClassModel.getAllClass((err, Class) => {
        console.log('Class list here!');
        //if failue !!
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class Selected All Successfully!', data: Class });
    })
};

//get Class by ID
exports.getClassById = (req, res) => {
    console.log('get Class by Id');
    ClassModel.getClassById(req.params.id, (err, Class) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class By ID Seleted Successfully!', data: Class });
    })
}

//get Class by teacher
exports.getClassByTeacher = (req, res) => {
    console.log('get Class by Id');
    ClassModel.getClassByTeacher(req.params.id, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class By Teacher Seleted Successfully!', data: Class });
    })
}

//get Class by Course
exports.getClassByCourse = (req, res) => {
    console.log('get Class by Course');
    ClassModel.getClassByCourse(req.params.id, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class By Course Seleted Successfully!', data: Class });
    })
}

//get Class by ID
exports.getStudentByClass = (req, res) => {
    console.log('get Student in class');
    ClassModel.getStudentByClass(req.params.id, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class By Teacher Seleted Successfully!', data: Class });
    })
}

//get Class Search
exports.getSearchClass = (req, res) => {
    var name, course, status;
    (req.body.course == "") ? course = '%%': course = '%' + req.body.course + '%';
    (req.body.name == "") ? name = '%%': name = '%' + req.body.name + '%';
    (req.body.status == "") ? status = '%%': status = '%' + req.body.status + '%';
    ClassModel.getSearchClass(name, course, status, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class Search Seleted Successfully!', data: Class });
    })
}


//create new Class
exports.createClass = (req, res) => {
    console.log('create new Class', req.body);
    const ClassReqData = new ClassModel(req.body);
    ClassReqData.cla_isDelete = 0;
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        ClassModel.createClass(ClassReqData, (err, Class) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Class Created Successfully!', data: Class });
        });
    }
}


//Update Class by id
exports.updateClass = (req, res) => {
    const ClassReqData = new ClassModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        ClassModel.updateClassById(req.params.id, ClassReqData, (err, Class) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Class Updated Successfully!' });
        });
    }
}

//Update Class by id
exports.completeClass = (req, res) => {
    const ClassReqData = new ClassModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        ClassModel.completeClassById(req.params.id, ClassReqData, (err, Class) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Class Updated Successfully!' });
        });
    }
}

//Delete Class by id
exports.deleteClass = (req, res) => {
    console.log('delete Class here');
    ClassModel.deleteClassById(req.params.id, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class Deleted Successfully!' });
    });
}