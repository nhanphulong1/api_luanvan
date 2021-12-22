var dbConn = require('../../config/db.config');

var Teacher = function(teacher) {
    this.tea_name = teacher.tea_name;
    this.tea_email = teacher.tea_email;
    this.tea_gender = teacher.tea_gender;
    this.tea_national = teacher.tea_national;
    this.tea_birthday = teacher.tea_birthday;
    this.tea_address = teacher.tea_address;
    this.tea_residence = teacher.tea_residence;
    this.tea_phone = teacher.tea_phone;
    this.tea_cmnd = teacher.tea_cmnd;
    this.tea_cardIssue = teacher.tea_cardIssue;
    this.tea_cardDate = teacher.tea_cardDate;
    this.tea_image = teacher.tea_image;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all teacher
Teacher.getAllTeachers = (result) => {
    dbConn.query(`select *, t.tea_id, sum(if(cla_status = 0,1,0)) as cla_status, t.created_at, t.updated_at
    from teachers t left join class c on t.tea_id = c.tea_id 
    WHERE tea_isDelete != 1
    group by t.tea_id ORDER BY tea_code DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching Teachers', err);
            result(err, null);
        } else {
            console.log('Teachers fetching successfully');
            result(null, res);
        }
    })
}

//get all teacher
Teacher.getFullTeachers = (result) => {
    dbConn.query(`select *, t.tea_id, sum(if(cla_status = 0,1,0)) as cla_status, t.created_at, t.updated_at
    from teachers t left join class c on t.tea_id = c.tea_id 
    group by t.tea_id ORDER BY tea_code DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching Teachers', err);
            result(err, null);
        } else {
            console.log('Teachers fetching successfully');
            result(null, res);
        }
    })
}

//get all teacher
Teacher.getCountTeachers = (result) => {
    dbConn.query(`select count(*) as tea_number
    from teachers
    WHERE tea_isDelete != 1`, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            console.log('Teachers fetching successfully');
            result(null, res);
        }
    })
}

//get Teacher by id
Teacher.getTeacherById = (id, result) => {
    dbConn.query('SELECT * FROM teachers Where tea_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Teacher by id', err);
            result(err, null);
        } else {
            console.log('Teacher by id fetching successfully');
            result(null, res);
        }
    })
}

//get Teacher search
Teacher.getTeacherSearch = (email, name, tea_code, result) => {
    let query = `select * FROM teachers
            WHERE tea_email LIKE '` + email + `' AND tea_name LIKE '` + name + `' AND tea_code LIKE '` + tea_code + `'`;
    dbConn.query(query, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get Teacher by id
Teacher.checkTeacher = (email, phone, result) => {
    console.log("check: ", email, phone);
    dbConn.query(`Select * From Teachers
        where (tea_email = ? OR tea_phone=?) AND tea_isDelete != 1`, [email, phone], (err, res) => {
        if (err) {
            console.log('Check Teacher Error!', err);
            result(err, null);
        } else {
            // console.log('Fetching Teacher By ID Successfully');
            result(null, res);
        }
    });
}

//create new Teacher
Teacher.createTeacher = (TeacherReqData, result) => {
    dbConn.query('INSERT INTO teachers SET ? ', TeacherReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data', err);
            result(err, null);
        } else {
            console.log('Teacher created successfully!');
            result(null, res)
        }
    })
}


//update Teacher by id
Teacher.updateTeacherById = (id, TeacherReqData, result) => {
    dbConn.query('UPDATE teachers SET tea_name=?,tea_email=?,tea_address=?,tea_residence=?,tea_phone=?,tea_gender=?,tea_national=?,tea_image=?,tea_cmnd=?,tea_cardIssue=?,tea_cardDate=?,tea_birthday=?,updated_at=? WHERE tea_id = ?', [TeacherReqData.tea_name, TeacherReqData.tea_email, TeacherReqData.tea_address, TeacherReqData.tea_residence, TeacherReqData.tea_phone, TeacherReqData.tea_gender, TeacherReqData.tea_national,
        TeacherReqData.tea_image, TeacherReqData.tea_cmnd, TeacherReqData.tea_cardIssue, TeacherReqData.tea_cardDate, TeacherReqData.tea_birthday, TeacherReqData.updated_at, id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Teacher updated successfully!');
            result(null, res);
        }
    })
};

//Delete Teacher by id
Teacher.deleteTeacherById = (id, result) => {
    dbConn.query('UPDATE teachers SET tea_isDelete = 1 WHERE tea_id = ? ', [id], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            console.log('Teacher Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Teacher;