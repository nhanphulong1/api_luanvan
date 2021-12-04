const ClassModel = require('../models/Class.model');


// get all Class list
exports.getClassList = (req, res) => {
    // console.log('Class list here!');
    ClassModel.getAllClass((err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class Selected All Successfully!', data: Class });
    })
};

// get all Class list
exports.getCountClass = (req, res) => {
    ClassModel.getCountClass((err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, data: Class[0].cla_number });
    })
};

// get all Class list
exports.getClassIsTeacherNullList = (req, res) => {
    // console.log('Class list here!');
    ClassModel.getAllClassTeacherNull((err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class Selected Successfully!', data: Class });
    })
};

//get Class by ID
exports.getClassById = (req, res) => {
    console.log('get Class by Id');
    ClassModel.getClassById(req.params.id, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
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

//get Class by student
exports.getClassByStudent = (req, res) => {
    console.log('get Class by Id');
    ClassModel.getClassByStudent(req.params.id, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class By Student Seleted Successfully!', data: Class });
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
    var tea_name, cou_id, cla_course;
    (req.body.cou_id == "") ? cou_id = '': cou_id = ' AND c.cou_id = ' + req.body.cou_id;
    (req.body.tea_name == "") ? tea_name = "": tea_name = " AND tea_name LIKE '%" + req.body.tea_name + "%'";
    (req.body.cla_course == "") ? cla_course = '': cla_course = ' AND cla_course = ' + req.body.cla_course;
    ClassModel.getSearchClass(tea_name, cou_id, cla_course, (err, Class) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Class Search Seleted Successfully!', data: Class });
    })
}

//check class full
exports.checkClass = (req, res) => {
    ClassModel.checkClassFull(req.params.id, (err, Class) => {
        if (err || !Class) {
            return res.json({ status: 0, message: err });
        }
        if (Class.cla_number < Class.cla_quantity)
            return res.json({ status: 1 });
        else
            return res.json({ status: 2 });
    })
}


//create new Class
exports.createClass = (req, res) => {
    console.log('create new Class', req.body);
    const ClassReqData = new ClassModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ClassReqData.cla_isDelete = 0;
        ClassModel.getAllClassByCourse(ClassReqData.cou_id, (err, Class) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            var code = +Class[0].cla_code.slice(2) + 1;
            code = code + '';
            console.log('code: ', code);
            while (code.length < 5) {
                code = '0' + code;
            }
            ClassReqData.cla_code = Class[0].cou_name + code;
            console.log("Create Json: ", ClassReqData);
            ClassModel.createClass(ClassReqData, (err, Class) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json({ status: 1, message: 'Class Created Successfully!', data: Class });
            });
        })
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
        ClassModel.completeClassById(req.params.id, ClassReqData, (err, Class) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Class Updated Successfully!' });
        });
    }
}

//Update Class by id
exports.comClassById = (req, res) => {
    const ClassReqData = new ClassModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        ClassModel.comClassById(req.params.id, ClassReqData, (err, Class) => {
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