var dbConn = require('../../config/db.config');

var Student = function(student) {
    this.stu_name = student.stu_name;
    this.stu_email = student.stu_email;
    this.stu_image = student.stu_image;
    this.stu_phone = student.stu_phone;
    this.stu_address = student.stu_address;
    this.stu_residence = student.stu_residence;
    this.stu_birthday = student.stu_birthday;
    this.stu_gender = student.stu_gender;
    this.stu_cmnd = student.stu_cmnd;
    this.stu_cardIssue = student.stu_cardIssue;
    this.stu_cardDate = student.stu_cardDate;
    this.stu_national = student.stu_national;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all student
Student.getAllStudents = (result) => {
    dbConn.query(`SELECT *, s.stu_id FROM students s
    Left Join details de on de.stu_id = s.stu_id
    Left Join class c on c.cla_id = de.cla_id
    Left Join Courses co on c.cou_id = co.cou_id
    Left Join Payments pay on pay.de_id = de.de_id
    Left Join exam_student es on es.stu_id = s.stu_id
    Left Join Results re on re.es_id = es.es_id
    Where stu_isDelete != 1 ORDER BY s.stu_id DESC
    `, (err, res) => {
        if (err) {
            console.log('Error while fetching student!');
            result(err, null);
        } else {
            console.log('Fetching Student Successfully');
            result(null, res);
        }
    });
}

//get all student
Student.getAllStudentDelete = (result) => {
    dbConn.query('SELECT * FROM students ORDER BY stu_id DESC', (err, res) => {
        if (err) {
            console.log('Error while fetching student!');
            result(err, null);
        } else {
            console.log('Fetching Student Successfully');
            result(null, res);
        }
    });
}

//get student by id
Student.getStudentById = (id, result) => {
    dbConn.query(`SELECT *,de.de_id FROM students s
    Left Join details de on de.stu_id = s.stu_id
    Left Join class c on c.cla_id = de.cla_id
    Left Join Courses co on c.cou_id = co.cou_id
    Left Join teachers t on t.tea_id = c.tea_id
    Left Join Payments pay on pay.de_id = de.de_id
    Left Join exam_student es on es.stu_id = s.stu_id
    Left Join Results re on re.es_id = es.es_id
    Left Join exams ex on ex.ex_id = es.ex_id
    Where s.stu_id=? AND stu_isDelete != 1
    `, [id], (err, res) => {
        if (err) {
            console.log('Error while fetching student by id!');
            result(err, null);
        } else {
            console.log('Fetching Student By ID Successfully');
            result(null, res);
        }
    });
}

//get all student
Student.getCountStudents = (result) => {
    dbConn.query(`SELECT count(s.stu_id) as stu_number FROM students s
    Join details de on de.stu_id = s.stu_id
    Join class c on c.cla_id = de.cla_id
    Where stu_isDelete != 1 AND c.cla_status = 0
    `, (err, res) => {
        if (err) {
            console.log('Error while fetching student!');
            result(err, null);
        } else {
            console.log('Fetching Student Successfully');
            result(null, res);
        }
    });
}


//get student by id
Student.checkStudent = (req, result) => {
    console.log('check req: ', req);
    dbConn.query(`Select * From students s
    join details de on de.stu_id = s.stu_id
    join class c on c.cla_id = de.cla_id
    where (stu_email = ? OR stu_phone=?) AND c.cou_id = ? AND stu_isDelete != 1`, [req.stu_email, req.stu_phone, req.cou_id], (err, res) => {
        if (err) {
            console.log('Check Student Error!', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

//get Student search
Student.getStudentSearch = (name, cou_id, type, result) => {
    let query = `SELECT * FROM students s
    Join details de on de.stu_id = s.stu_id
    Join class c on c.cla_id = de.cla_id
    Join Courses co on c.cou_id = co.cou_id
    Left Join Payments pay on pay.de_id = de.de_id
    Left Join exam_student es on es.stu_id = s.stu_id
    Left Join Results re on re.es_id = es.es_id
    where stu_name LIKE '` + name + `' AND c.cou_id LIKE '` + cou_id + `' AND cla_status LIKE '` + type + `' AND stu_isDelete != 1
    ORDER BY s.stu_id DESC`;
    // if (type == 1) {
    //     query = `SELECT * FROM students s
    //     Join details de on de.stu_id = s.stu_id
    //     Join class c on c.cla_id = de.cla_id
    //     Join Courses co on c.cou_id = co.cou_id
    //     Left Join Payments pay on pay.de_id = de.de_id
    //     Left Join exam_student es on es.stu_id = s.stu_id
    //     Left Join Results re on re.es_id = es.es_id
    //     where stu_name LIKE '` + name + `' AND c.cou_id LIKE '` + cou_id + `' AND pay_type IS NULL AND stu_isDelete != 1
    //     ORDER BY s.stu_id DESC`;
    // } else if (type == 2) {
    //     query = `SELECT * FROM students s
    //     Join details de on de.stu_id = s.stu_id
    //     Join class c on c.cla_id = de.cla_id
    //     Join Courses co on c.cou_id = co.cou_id
    //     Left Join Payments pay on pay.de_id = de.de_id
    //     Left Join exam_student es on es.stu_id = s.stu_id
    //     Left Join Results re on re.es_id = es.es_id
    //     where stu_name LIKE '` + name + `' AND c.cou_id LIKE '` + cou_id + `' AND pay_type IS NOT NULL AND stu_isDelete != 1
    //     ORDER BY s.stu_id DESC`;
    // }
    dbConn.query(query, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//Create student
Student.createStudent = (StudentReq, result) => {
    dbConn.query('INSERT INTO students SET ? ', StudentReq, (err, res) => {
        if (err) {
            console.log('Error while inserting student data');
            result(err, null);
        } else {
            console.log('Student created successfully!');
            result(null, res)
        }
    });
}

//Update Student by id
Student.updateStudent = (id, StudentReq, result) => {
    console.log(StudentReq);
    dbConn.query('UPDATE students SET stu_name=?,stu_email=?,stu_address=?,stu_residence=?,stu_birthday=?,stu_phone=?,stu_gender=?,stu_cmnd=?,stu_cardIssue=?,stu_cardDate=?,stu_image=?,stu_national=?,updated_at=? WHERE stu_id = ?', [StudentReq.stu_name, StudentReq.stu_email, StudentReq.stu_address, StudentReq.stu_residence, StudentReq.stu_birthday, StudentReq.stu_phone, StudentReq.stu_gender, StudentReq.stu_cmnd, StudentReq.stu_cardIssue, StudentReq.stu_cardDate, StudentReq.stu_image, StudentReq.stu_national, StudentReq.updated_at, id], (err, res) => {
        if (err) {
            console.log('Error while updating student');
            result(err, null);
        } else {
            console.log('Updated Student Successfully!');
            result(null, res);
        }
    })
}

//Delete student by id
Student.deleteStudent = (id, result) => {
    dbConn.query('UPDATE students SET stu_isDelete = 1 WHERE stu_id = ? ', id, (err, res) => {
        if (err) {
            console.log('Error while delete student');
            result(err, null);
        } else {
            console.log('Deleted Student Successfully');
            result(null, res);
        }

    })
}

module.exports = Student;