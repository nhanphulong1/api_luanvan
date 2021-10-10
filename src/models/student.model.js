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
    dbConn.query('SELECT * FROM students Where stu_isDelete != 1 ORDER BY stu_id DESC', (err, res) => {
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
    dbConn.query('SELECT * FROM students WHERE stu_id = ? AND stu_isDelete != 1', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching student by id!');
            result(err, null);
        } else {
            console.log('Fetching Student By ID Successfully');
            result(null, res);
        }
    });
}

//get Student search
Student.getStudentSearch = (name, phone, address, result) => {
    dbConn.query("SELECT * FROM Students where stu_name LIKE ? AND stu_phone LIKE ? AND stu_address LIKE ? AND stu_isDelete != 1 ORDER BY stu_id DESC", [name, phone, address], (err, res) => {
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
    dbConn.query('UPDATE students SET stu_name=?,stu_email=?,stu_address=?,stu_residence=?,stu_birthday=?,stu_phone=?,stu_gender=?,stu_cmnd=?,stu_cardIssue=?,stu_cardDate=?,stu_image=?,stu_national=?,updated_at=? WHERE stu_id = ?', [StudentReq.stu_name, StudentReq.stu_email, StudentReq.stu_address, StudentReq.stu_residence, StudentReq.stu_birthday, StudentReq.stu_phone, StudentReq.stu_gender, StudentReq.stu_cmnd, StudentReq.stu_cardIssue, StudentReq.stu_carDate, StudentReq.stu_image, StudentReq.stu_national, StudentReq.updated_at, id], (err, res) => {
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
    dbConn.query('UPDATE students SET stu_isDelete = true WHERE stu_id = ? ', id, (err, res) => {
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