const dbConn = require('../../config/db.config');

var Course = function(course) {
    this.cou_name = course.cou_name;
    this.cou_quantity = course.cou_quantity;
    this.cou_fee = course.cou_fee;
    this.cou_training = course.cou_training;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all Courses
Course.getAllCourses = (result) => {
    dbConn.query('SELECT * FROM Courses', (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            console.log('Courses fetching successfully');
            result(null, res);
        }
    })
}

//get Course by id
Course.getCourseById = (id, result) => {
    dbConn.query('SELECT * FROM Courses Where cou_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Course by id', err);
            result(err, null);
        } else {
            console.log('Course by id fetching successfully');
            result(null, res);
        }
    })
}

Course.getCourseByName = (name, result) => {
    dbConn.query('SELECT * FROM Courses Where cou_name = ?', name, (err, res) => {
        if (err) {
            console.log('Error while fetching Course by id', err);
            result(err, null);
        } else {
            console.log('Course by name fetching successfully');
            result(null, res[0]);
        }
    })
}

//create new Course
Course.createCourse = (CourseReqData, result) => {
    dbConn.query('INSERT INTO Courses SET ? ', CourseReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('Course created successfully!');
            result(null, res)
        }
    })
}


//update Course by id
Course.updateCourseById = (id, CourseReqData, result) => {
    dbConn.query('UPDATE Courses SET cou_name=?,cou_quantity=?,cou_fee=?,cou_training=?,updated_at=? WHERE cou_id = ?', [CourseReqData.cou_name, CourseReqData.cou_quantity, CourseReqData.cou_fee, CourseReqData.cou_training, CourseReqData.updated_at, id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Course updated successfully!');
            result(null, res);
        }
    })
};

//Delete Course by id
Course.deleteCourseById = (id, result) => {
    dbConn.query('DELETE FROM Courses WHERE cou_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Course Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Course;