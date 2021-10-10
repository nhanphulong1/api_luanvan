var dbConn = require('../../config/db.config');

var Teacher = function(teacher) {
    this.tea_name = teacher.tea_name;
    this.tea_email = teacher.tea_email;
    this.tea_gender = teacher.tea_gender;
    this.tea_birthday = teacher.tea_birthday;
    this.tea_address = teacher.tea_address;
    this.tea_phone = teacher.tea_phone;
    this.tea_cmnd = teacher.tea_cmnd;
    this.tea_image = teacher.tea_image;
    // this.token = teacher.token;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all teacher
Teacher.getAllTeachers = (result) => {
    dbConn.query(`select t.tea_id, t.tea_name, tea_email, tea_address, tea_phone, tea_image, tea_gender, tea_cmnd, tea_birthday, sum(if(cla_status = 1,1,0)) as cla_status, t.created_at, t.updated_at
    from teachers t left join class c on t.tea_id = c.tea_id 
    group by t.tea_id`, (err, res) => {
        if (err) {
            console.log('Error while fetching Teachers', err);
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
Teacher.getTeacherSearch = (email, name, type, result) => {
    var query = '';
    switch (type) {
        case '0':
            query = `select t.tea_id, t.tea_name, tea_email, tea_address, tea_phone, tea_image, tea_gender, tea_cmnd, tea_birthday, sum(if(cla_status = 1,1,0)) as cla_status, t.created_at, t.updated_at 
            from teachers t left join class c on t.tea_id = c.tea_id 
            WHERE tea_email LIKE '` + email + `' AND tea_name LIKE '` + name + `' 
            group by t.tea_id 
            HAVING cla_status = 0`
            break;
        case '1':
            query = `select t.tea_id, t.tea_name, tea_email, tea_address, tea_phone, tea_image, tea_gender, tea_cmnd, tea_birthday, sum(if(cla_status = 1,1,0)) as cla_status, t.created_at, t.updated_at
            from teachers t left join class c on t.tea_id = c.tea_id 
            WHERE tea_email LIKE '` + email + `' AND tea_name LIKE '` + name + `'
            group by t.tea_id
            HAVING cla_status != 0`
            break;

        default:
            query = `select t.tea_id, t.tea_name, tea_email, tea_address, tea_phone, tea_image, tea_gender, tea_cmnd, tea_birthday, sum(if(cla_status = 1,1,0)) as cla_status, t.created_at, t.updated_at
            from teachers t left join class c on t.tea_id = c.tea_id 
            WHERE tea_email LIKE '` + email + `' AND tea_name LIKE '` + name + `'
            group by t.tea_id`
            break;
    }
    dbConn.query(query, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//create new Teacher
Teacher.createTeacher = (TeacherReqData, result) => {
    dbConn.query('INSERT INTO teachers SET ? ', TeacherReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('Teacher created successfully!');
            result(null, res)
        }
    })
}


//update Teacher by id
Teacher.updateTeacherById = (id, TeacherReqData, result) => {
    dbConn.query('UPDATE teachers SET tea_name=?,tea_email=?,tea_address=?,tea_phone=?,tea_gender=?,tea_image=?,tea_cmnd=?,tea_birthday=?,updated_at=? WHERE tea_id = ?', [TeacherReqData.tea_name, TeacherReqData.tea_email, TeacherReqData.tea_address, TeacherReqData.tea_phone, TeacherReqData.tea_gender,
        TeacherReqData.tea_image, TeacherReqData.tea_cmnd, TeacherReqData.tea_birthday, TeacherReqData.updated_at, id
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
    dbConn.query('DELETE FROM teachers WHERE tea_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Teacher Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Teacher;