const dbConn = require('../../config/db.config');

var Course = function(course) {
    this.cou_name = course.cou_name;
    this.cou_quantity = course.cou_quantity;
    this.cou_fee = course.cou_fee;
    this.cou_training = course.cou_training;
    this.cou_image = course.cou_image;
    this.cou_content = course.cou_content;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all Courses
Course.getAllCourses = (result) => {
    dbConn.query('SELECT * FROM Courses ORDER BY cou_name', (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            console.log('Courses fetching successfully');
            result(null, res);
        }
    })
}

// //check regis class by course
// Course.checkClassByCourses = (id, result) => {
//     dbConn.query(`select *, c.cla_id, count(de_id) from courses co
//     join class c on c.cou_id = co.cou_id
//     left join details de on c.cla_id = de.cla_id
//     where co.cou_id = ? and c.cla_isDelete != 1 and cla_status = 0 and cla_admission = 0
//     group by c.cla_id
//     having count(de_id) < c.cla_quantity
//     order by c.created_at`, id, (err, res) => {
//         if (err) {
//             console.log('Error while fetching Courses', err);
//             result(err, null);
//         } else {
//             // console.log('Courses fetching successfully');
//             result(null, res);
//         }
//     })
// }

Course.getAllClassByAdmission = (id, result) => {
    dbConn.query(`select *, c.cla_id, count(de_id) as cla_number from courses co
    join class c on c.cou_id = co.cou_id
    LEFT Join Teachers t on t.tea_id = c.tea_id
    left join details de on c.cla_id = de.cla_id
    Left Join Students s on de.stu_id = s.stu_id
    where co.cou_id = ? and c.cla_isDelete != 1 and cla_status = 0 and cla_admission = 0 AND (stu_isDelete != 1 OR de.stu_id is null)
    group by c.cla_id
    having count(de_id) < c.cla_quantity
    order by c.created_at`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            // console.log('Courses fetching successfully');
            result(null, res);
        }
    })
}



//get all Courses
Course.getStatistic = (result) => {
    dbConn.query(`SELECT cla_course, count(de.stu_id) as count FROM courses co
    left join class c on co.cou_id = c.cou_id
    left join details de on de.cla_id = c.cla_id
    left join students s on de.stu_id  = s.stu_id
    group by cla_course
    order by cla_course DESC
    limit 10`, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            console.log('Courses fetching successfully');
            result(null, res);
        }
    })
}

Course.getStatistic1 = (start, end, pay, kq, cou_id, status, cla_course, result) => {
    let query = `SELECT * FROM students s
    Join details de on de.stu_id = s.stu_id
    Join class c on c.cla_id = de.cla_id
    Join Courses co on c.cou_id = co.cou_id
    Left Join teachers tea on tea.tea_id = c.tea_id
    Left Join Payments pay on pay.de_id = de.de_id
    Left Join Exam_student es on es.stu_id = s.stu_id
    Left Join Results re on es.es_id = re.es_id
    Where stu_isDelete != 1 AND s.created_at >= '` + start + `' ` + end + pay + kq + cou_id + status + cla_course + `
    ORDER BY s.stu_id DESC`;
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

Course.getStatistic2 = (start, end, cla_id, cla_course, cou_id, status, teacher, result) => {
    let query = `SELECT * FROM students s
    Join details de on de.stu_id = s.stu_id
    Join class c on c.cla_id = de.cla_id
    Join Courses co on c.cou_id = co.cou_id
    Left Join teachers tea on tea.tea_id = c.tea_id
    Left Join Payments pay on pay.de_id = de.de_id
    Left Join Exam_student es on es.stu_id = s.stu_id
    Left Join Results re on es.es_id = re.es_id
    Where stu_isDelete != 1 AND cla_start >= '` + start + `' ` + end + cla_id + cla_course + cou_id + status + teacher + `
    ORDER BY s.stu_id DESC`;
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

Course.getStatistic3 = (start, cla_id, cla_course, cou_id, ex_location, teacher, result) => {
    let query = `SELECT * FROM students s
    Join details de on de.stu_id = s.stu_id
    Join class c on c.cla_id = de.cla_id
    Join Courses co on c.cou_id = co.cou_id
    Left Join teachers tea on tea.tea_id = c.tea_id
    Left Join Payments pay on pay.de_id = de.de_id
    Join Exam_student es on es.stu_id = s.stu_id
    Join Exams ex on ex.ex_id = es.ex_id
    Left Join Results re on es.es_id = re.es_id
    Where stu_isDelete != 1 ` + start + cla_id + cla_course + cou_id + ex_location + teacher + `
    ORDER BY s.stu_id DESC`;
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get all Courses
Course.getStatisticbyResult = (result) => {
    dbConn.query(`SELECT re.re_result, count(*) as re_count FROM Courses co
    join exams ex on ex.cou_id = co.cou_id
    join exam_student es on ex.ex_id = es.ex_id
    join results re on re.es_id = es.es_id
    group by re.re_result
    order by re.re_result DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            console.log('Courses fetching successfully');
            result(null, res);
        }
    })
}

//get all Courses
Course.getStatisticCountStudent = (result) => {
    dbConn.query(`SELECT cou_name, count(de.de_id) as cou_count FROM Courses co
    left join class c on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    group by co.cou_id`, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            console.log('Courses fetching successfully');
            result(null, res);
        }
    })
}

Course.getStatisticByCourse = (name, result) => {
    let find = '';
    if (name == 'all')
        find = '';
    else find = name;
    dbConn.query(`SELECT cou_name,cla_course, count(de.stu_id) as count FROM courses co
    left join class c on co.cou_id = c.cou_id
    left join details de on de.cla_id = c.cla_id
    left join students s on de.stu_id  = s.stu_id
    where cou_name like '%` + find + `%'
    group by c.cou_id,  cla_course
    order by cla_course DESC
    limit 10`, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            // console.log('Courses fetching successfully', res);
            result(null, res);
        }
    })
}

Course.getStatisticResultbyCourse = (name, result) => {
    let find = '';
    if (name == 'all')
        find = '';
    else find = name;
    dbConn.query(`SELECT re.re_result, count(*) as re_count FROM Courses co
    join exams ex on ex.cou_id = co.cou_id
    join exam_student es on ex.ex_id = es.ex_id
    join results re on re.es_id = es.es_id
    where co.cou_name LIKE '%` + find + `%'
    group by re.re_result`, (err, res) => {
        if (err) {
            console.log('Error while fetching Courses', err);
            result(err, null);
        } else {
            console.log('Courses fetching successfully', res);
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
    dbConn.query('UPDATE Courses SET cou_name=?,cou_quantity=?,cou_fee=?,cou_training=?,cou_content=?,cou_image=?,updated_at=? WHERE cou_id = ?', [CourseReqData.cou_name, CourseReqData.cou_quantity, CourseReqData.cou_fee, CourseReqData.cou_training, CourseReqData.cou_content, CourseReqData.cou_image, CourseReqData.updated_at, id], (err, res) => {
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