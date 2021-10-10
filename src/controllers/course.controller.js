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
        res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
};

//get Course by ID
exports.getCourseById = (req, res) => {
    console.log('get Course by Id');
    CourseModel.getCourseById(req.params.id, (err, Course) => {
        if (err)
            return res.json({ status: 0, message: err });
        res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
}

//get Course by name
exports.getCourseByName = (req, res) => {
    console.log('get Course by Name');
    CourseModel.getCourseByName(req.params.name, (err, Course) => {
        if (err)
            return res.json({ status: 0, message: err });
        res.json({ status: 1, message: 'Course Selected Successfully!', data: Course });
    })
}

//create new Course
exports.createCourse = (req, res) => {
    console.log('create new Course', req.body);
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
            res.json({ status: 1, message: 'Course Created Successfully!', data: Course });
        });
    }
}


//Update Course by id
exports.updateCourse = (req, res) => {
    console.log('update Course by id:', req.body);
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
            res.json({ status: 1, message: 'Course Updated Successfully!' });
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
        res.json({ status: 1, message: 'Course Deleted Successfully!' });
    });
}