const CourseModel = require('../models/Course.model');


// get all Course list
exports.getCourseList = (req, res) => {
    // console.log('Course list here!');
    CourseModel.getAllCourses((err, Course) => {
        console.log('Course list here!');
        //if failue !!
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

//check class valid by course
exports.checkClassValid = (req, res) => {
    CourseModel.getAllClassByAdmission(req.params.id, (err, Course) => {
        // console.log('Course list here!');
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (Course.length == 0) {
            return res.json({ status: 0, message: 'No class valid!' });
        }
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};



// get all Course list
exports.getStatistic = (req, res) => {
    // console.log('Course list here!');
    CourseModel.getStatistic((err, Course) => {
        console.log('Course list here!');
        //if failue !!
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};


// get all Course list
exports.getStatistic1 = (req, res) => {
    let pay, kq, teacher, cla_id, cou_id, status, start, end, cla_course, es_status;
    switch (req.body.pay_type) {
        case '1':
            pay = ' AND pay_type IS NULL';
            break;
        case '2':
            pay = ' AND pay_type IS NOT NULL';
            break;

        default:
            pay = '';
            break;
    };

    switch (req.body.re_result) {
        case '1':
            kq = ' AND re.re_result = 1';
            break;
        case '2':
            kq = ' AND re.re_result = 0';
            break;
        case '3':
            kq = ' AND re.re_result IS NULL';
            break;
        default:
            kq = '';
            break;
    };

    if (req.body.teacher.length == 0) {
        teacher = '';
    } else {
        teacher = ' AND (';
        req.body.teacher.forEach(element => {
            teacher += " tea_name LIKE '" + element + "' OR";
        });
        teacher = teacher.slice(0, (teacher.length - 2));
        teacher += ")";
    }

    if (req.body.cla_id == 0) {
        cla_id = '';
    } else {
        cla_id = ' AND c.cla_id = ' + req.body.cla_id;
    };

    if (req.body.cou_id == 0) {
        cou_id = '';
    } else {
        cou_id = ' AND co.cou_id = ' + req.body.cou_id;
    };

    if (req.body.status == 0) {
        status = '';
    } else if (req.body.status == 1) {
        status = ' AND c.cla_status = 0';
    } else {
        status = ' AND c.cla_status = 1';
    };

    if (!req.body.start) {
        start = '1000-11-10'
    } else {
        start = req.body.start;
    }

    if (!req.body.end) {
        end = ''
    } else {
        end = " AND s.created_at <= '" + req.body.end + "'";
    }

    if (req.body.cla_course == 0) {
        cla_course = '';
    } else {
        cla_course = ' AND cla_course = ' + req.body.cla_course;
    };

    switch (req.body.es_status) {
        case '1':
            es_status = ' AND es.es_id IS NULL';
            break;
        case '2':
            es_status = ' AND es.es_id IS NOT NULL';
            break;
        default:
            es_status = '';
            break;
    };

    CourseModel.getStatistic1(start, end, pay, kq, cou_id, status, cla_course, teacher, cla_id, es_status, (err, Course) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

// get all Student by class
exports.getStatistic2 = (req, res) => {
    let cla_course, cla_id, cou_id, status, start, end, teacher;
    if (req.body.cla_course == 0) {
        cla_course = '';
    } else {
        cla_course = ' AND cla_course = ' + req.body.cla_course;
    };

    if (req.body.cla_id == 0) {
        cla_id = '';
    } else {
        cla_id = ' AND c.cla_id = ' + req.body.cla_id;
    };

    if (req.body.cou_id == 0) {
        cou_id = '';
    } else {
        cou_id = ' AND co.cou_id = ' + req.body.cou_id;
    };

    if (req.body.status == 0) {
        status = '';
    } else if (req.body.status == 1) {
        status = ' AND c.cla_status = 0';
    } else {
        status = ' AND c.cla_status = 1';
    };

    if (!req.body.start) {
        start = '1000-11-10'
    } else {
        start = req.body.start;
    }

    if (!req.body.end) {
        end = ''
    } else {
        end = " AND cla_start <= '" + req.body.end + "'";
    }

    if (req.body.teacher.length == 0) {
        teacher = '';
    } else {
        teacher = ' AND (';
        req.body.teacher.forEach(element => {
            teacher += " tea_name LIKE '" + element + "' OR";
        });
        teacher = teacher.slice(0, (teacher.length - 2));
        teacher += ")";
    }

    CourseModel.getStatistic2(start, end, cla_id, cla_course, cou_id, status, teacher, (err, Course) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

// get all Student by class
exports.getStatistic3 = (req, res) => {
    let cla_course, re_result, cla_id, cou_id, ex_location, start, teacher;
    if (req.body.cla_course == 0) {
        cla_course = '';
    } else {
        cla_course = ' AND cla_course = ' + req.body.cla_course;
    };

    if (req.body.cla_id == 0) {
        cla_id = '';
    } else {
        cla_id = ' AND c.cla_id = ' + req.body.cla_id;
    };

    if (req.body.cou_id == 0) {
        cou_id = '';
    } else {
        cou_id = ' AND co.cou_id = ' + req.body.cou_id;
    };

    if (req.body.re_result == '') {
        re_result = '';
    } else if (req.body.re_result == '-1') {
        re_result = ' AND re.re_result IS NULL';
    } else {
        re_result = ' AND re.re_result = ' + req.body.re_result;
    }

    if (req.body.ex_location == '') {
        ex_location = '';
    } else {
        ex_location = " AND ex_location LIKE '%" + req.body.ex_location + "%'";
    }

    if (!req.body.start) {
        start = ''
    } else {
        start = " AND ex_date = '" + req.body.start + "'";
    }

    if (req.body.teacher.length == 0) {
        teacher = '';
    } else {
        teacher = ' AND (';
        req.body.teacher.forEach(element => {
            teacher += " tea_name LIKE '" + element + "' OR";
        });
        teacher = teacher.slice(0, (teacher.length - 2));
        teacher += ")";
    }

    CourseModel.getStatistic3(start, cla_id, cla_course, cou_id, ex_location, teacher, re_result, (err, Course) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

exports.getStatisticTeacher = (req, res) => {
    let pay, kq, teacher, cla_id, cou_id, status, start, end, cla_course, es_status;
    switch (req.body.pay_type) {
        case '1':
            pay = ' AND pay_type IS NULL';
            break;
        case '2':
            pay = ' AND pay_type IS NOT NULL';
            break;

        default:
            pay = '';
            break;
    };

    switch (req.body.re_result) {
        case '1':
            kq = ' AND re.re_result = 1';
            break;
        case '2':
            kq = ' AND re.re_result = 0';
            break;
        case '3':
            kq = ' AND re.re_result IS NULL';
            break;
        default:
            kq = '';
            break;
    };


    teacher = ' AND c.tea_id = ' + req.body.tea_id;


    if (req.body.cla_id == 0) {
        cla_id = '';
    } else {
        cla_id = ' AND c.cla_id = ' + req.body.cla_id;
    };

    if (req.body.cou_id == 0) {
        cou_id = '';
    } else {
        cou_id = ' AND co.cou_id = ' + req.body.cou_id;
    };

    if (req.body.status == 0) {
        status = '';
    } else if (req.body.status == 1) {
        status = ' AND c.cla_status = 0';
    } else {
        status = ' AND c.cla_status = 1';
    };

    if (!req.body.start) {
        start = '1000-11-10'
    } else {
        start = req.body.start;
    }

    if (!req.body.end) {
        end = ''
    } else {
        end = " AND s.created_at <= '" + req.body.end + "'";
    }

    if (req.body.cla_course == 0) {
        cla_course = '';
    } else {
        cla_course = ' AND cla_course = ' + req.body.cla_course;
    };

    switch (req.body.es_status) {
        case '1':
            es_status = ' AND es.es_id IS NULL';
            break;
        case '2':
            es_status = ' AND es.es_id IS NOT NULL';
            break;
        default:
            es_status = '';
            break;
    };

    CourseModel.getStatisticTeacher(start, end, pay, kq, cou_id, status, cla_course, teacher, cla_id, es_status, (err, Course) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
}

exports.getStatisticByResult = (req, res) => {
    CourseModel.getStatisticbyResult((err, Course) => {
        console.log('Course list here!');
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

exports.getStatisticByCountStudent = (req, res) => {
    // console.log('Course list here!');
    CourseModel.getStatisticCountStudent((err, Course) => {
        console.log('Course list here!');
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};


exports.getStatisticByCourse = (req, res) => {
    CourseModel.getStatisticByCourse(req.params.name, (err, Course) => {
        // console.log('Request param', req.params);
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

exports.getStatisticResultByCourse = (req, res) => {
    CourseModel.getStatisticResultbyCourse(req.params.name, (err, Course) => {
        console.log('Course list here!');
        if (err) {
            return res.json({ status: 0, message: err });
        }
        //Query seccessfully!
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

//get Course by ID
exports.getCourseById = (req, res) => {
    console.log('get Course by Id');
    CourseModel.getCourseById(req.params.id, (err, Course) => {
        if (err)
            return res.json({ status: 0, message: err });
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
}

//get Course by name
exports.getCourseByName = (req, res) => {
    console.log('get Course by Name');
    CourseModel.getCourseByName(req.params.name, (err, Course) => {
        if (err)
            return res.json({ status: 0, message: err });
        return res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
}

//create new Course
exports.createCourse = (req, res) => {
    const CourseReqData = new CourseModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        CourseModel.createCourse(CourseReqData, (err, Course) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Course Created Successfully!', data: Course });
        });
    }
}


//Update Course by id
exports.updateCourse = (req, res) => {
    const CourseReqData = new CourseModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        CourseModel.updateCourseById(req.params.id, CourseReqData, (err, Course) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Course Updated Successfully!' });
        });
    }
}

//Delete Course by id
exports.deleteCourse = (req, res) => {
    console.log('delete Course here');
    CourseModel.deleteCourseById(req.params.id, (err, Course) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Course Deleted Successfully!' });
    });
}