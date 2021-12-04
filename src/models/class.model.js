var dbConn = require('../../config/db.config');

var Class = function(Class) {
    this.cla_code = Class.cla_code;
    this.cla_name = Class.cla_name;
    this.cla_fee = Class.cla_fee;
    this.cla_course = Class.cla_course;
    this.cla_start = Class.cla_start;
    this.cla_status = Class.cla_status;
    this.cla_quantity = Class.cla_quantity;
    this.cla_count = Class.cla_count;
    this.cla_admission = Class.cla_admission;
    this.cla_isDelete = Class.cla_isDelete;
    this.cou_id = Class.cou_id;
    this.tea_id = Class.tea_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all Class
Class.getAllClass = (result) => {
    dbConn.query(`SELECT *,c.cla_id, count(DISTINCT de.de_id) as cla_number, count(DISTINCT di.di_id) as cla_diary FROM class c 
    join courses co on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    left join teachers t on t.tea_id = c.tea_id
    left join students s on s.stu_id = de.stu_id
    left join diaries di on c.cla_id = di.cla_id
    WHERE cla_isDelete != 1 AND (stu_isDelete != 1 OR de.stu_id is null)
    GROUP BY c.cla_id
    ORDER BY c.cla_id DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching Class', err);
            result(err, null);
        } else {
            console.log('Class fetching successfully');
            result(null, res);
        }
    })
}

//get count Class active
Class.getCountClass = (result) => {
    dbConn.query(`SELECT count(*) as cla_number FROM class 
    WHERE cla_isDelete != 1 AND cla_status = 0
    `, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get all Class teacher null
Class.getAllClassTeacherNull = (result) => { //WHERE cla_isDelete != 1 AND c.tea_id is null
    dbConn.query(`SELECT *,c.cla_id, count(de.de_id) as cla_number FROM class c 
    join courses co on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    left join teachers t on t.tea_id = c.tea_id
    left join students s on s.stu_id = de.stu_id
    WHERE cla_isDelete != 1 AND (stu_isDelete != 1 OR de.stu_id is null) AND c.tea_id is null
    GROUP BY c.cla_id
    ORDER BY c.cla_id DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching Class', err);
            result(err, null);
        } else {
            console.log('Class fetching successfully');
            result(null, res);
        }
    })
}


//check full Class
Class.checkClassFull = (id, result) => { //WHERE cla_isDelete != 1 AND c.cla_id=?
    dbConn.query(`SELECT cla_quantity, count(de.de_id) as cla_number FROM class c 
    join courses co on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    left join students s on s.stu_id = de.stu_id
    WHERE cla_isDelete != 1 AND c.cla_id=? AND (stu_isDelete != 1 OR de.stu_id is null)
    GROUP BY c.cla_id`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class', err);
            result(err, null);
        } else {
            console.log('Class fetching successfully');
            result(null, res[0]);
        }
    })
}

//get all Class Search
Class.getSearchClass = (tea_name, cou_id, cla_course, result) => { //    WHERE c.cla_name LIKE ? AND co.cou_id LIKE ? AND cla_status LIKE ? AND cla_isDelete != 1
    let query = `SELECT *,c.cla_id, count(de.de_id) as cla_number FROM class c 
    join courses co on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    left join teachers t on t.tea_id = c.tea_id
    left join students s on s.stu_id = de.stu_id
    WHERE cla_isDelete != 1 AND (stu_isDelete != 1 OR de.stu_id is null)` + tea_name + cou_id + cla_course +
        ` GROUP BY c.cla_id
    ORDER BY c.cla_id DESC`
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching Class', err);
            result(err, null);
        } else {
            console.log('Class fetching successfully');
            result(null, res);
        }
    })
}

//get Class by id
Class.getClassById = (id, result) => {
    dbConn.query(`SELECT *,c.cla_id, count(DISTINCT de.de_id) as cla_number, count(DISTINCT di.di_id) as cla_diary FROM class c 
        join courses co on c.cou_id = co.cou_id
        left join details de on de.cla_id = c.cla_id
        left join teachers t on t.tea_id = c.tea_id
        left join students s on s.stu_id = de.stu_id
        left join diaries di on c.cla_id = di.cla_id
        WHERE cla_isDelete != 1 AND c.cla_id = ? AND (stu_isDelete != 1 OR de.stu_id is null)
        GROUP BY c.cla_id`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(err, null);
        } else {
            console.log('Class by id fetching successfully');
            result(null, res);
        }
    })
}

//get Class by Teacher
Class.getClassByTeacher = (id, result) => {
    dbConn.query('SELECT * FROM Class Join Courses On Class.cou_id = Courses.cou_id Where tea_id = ? AND cla_isDelete != 1 ORDER BY cla_code DESC', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(err, null);
        } else {
            console.log('Class by id fetching successfully');
            result(null, res);
        }
    })
}

//get Class by Student
Class.getClassByStudent = (id, result) => {
    dbConn.query(`select *,c.cla_id from students s
    left join details de on s.stu_id = de.stu_id
    left join class c on c.cla_id = de.cla_id
    left join teachers t on c.tea_id = t.tea_id
    left join courses co on co.cou_id = c.cou_id
    where s.stu_id = ? AND cla_isDelete!=1
    ORDER BY c.cla_id DESC`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(err, null);
        } else {
            console.log('Class by student id fetching successfully');
            result(null, res);
        }
    })
}

//get Class by course
Class.getClassByCourse = (id, result) => {
    dbConn.query('SELECT * FROM Class Join Courses On Class.cou_id = Courses.cou_id Where Courses.cou_id = ? AND cla_isDelete != 1 ORDER BY cla_code DESC', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by course', err);
            result(err, null);
        } else {
            console.log('Class by course fetching successfully');
            result(null, res);
        }
    })
}

//get Class by course
Class.getAllClassByCourse = (id, result) => {
    dbConn.query('SELECT * FROM Class Join Courses On Class.cou_id = Courses.cou_id Where Courses.cou_id = ? ORDER BY cla_code DESC', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by course', err);
            result(err, null);
        } else {
            console.log('Class by course fetching successfully');
            result(null, res);
        }
    })
}

//get student by class
Class.getStudentByClass = (id, result) => {
    dbConn.query(`SELECT s.*, pay.*, re_result, de.de_id, Count(att_id) as stu_count  
    from class c join details de on c.cla_id = de.cla_id
    left join payments pay on pay.de_id = de.de_id
    join Students s on s.stu_id = de.stu_id
    left join exam_student es on es.stu_id = s.stu_id
    left join results re on es.es_id = re.es_id
    left join attendance att on att.stu_id = s.stu_id
    where c.cla_id = ? and cla_isDelete != 1 AND s.stu_isDelete != 1
    Group by s.stu_id
    ORDER BY stu_name`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(err, null);
        } else {
            console.log('Class by id fetching successfully');
            result(null, res);
        }
    })
}

//create new Class
Class.createClass = (ClassReqData, result) => {
    dbConn.query('INSERT INTO Class SET ? ', ClassReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('Class created successfully!');
            result(null, res)
        }
    })
}

//update Class by id
Class.updateClassById = (id, ClassReqData, result) => {
    dbConn.query('UPDATE Class SET cla_name=?,cla_fee=?,cla_course=?,cla_start=?,cla_quantity=?,cla_count=?,cla_admission=?,cou_id=?,tea_id=?,updated_at=? WHERE cla_id = ?', [ClassReqData.cla_name,
        ClassReqData.cla_fee,
        ClassReqData.cla_course,
        ClassReqData.cla_start,
        ClassReqData.cla_quantity,
        ClassReqData.cla_count,
        ClassReqData.cla_admission,
        ClassReqData.cou_id,
        ClassReqData.tea_id,
        ClassReqData.updated_at,
        id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data', err);
            result(err, null);
        } else {
            console.log('Class updated successfully!');
            result(null, res);
        }
    })
};

//update Class by id
Class.completeClassById = (id, ClassReqData, result) => {
    dbConn.query('UPDATE Class SET cla_status=?,cla_admission=1,updated_at=? WHERE cla_id = ?', [
        ClassReqData.cla_status,
        ClassReqData.updated_at,
        id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Class updated successfully!');
            result(null, res);
        }
    })
};

//update Class by id
Class.comClassById = (id, ClassReqData, result) => {
    dbConn.query('UPDATE Class SET cla_complete=1,updated_at=? WHERE cla_id = ?', [
        ClassReqData.updated_at,
        id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data', err);
            result(err, null);
        } else {
            console.log('Class updated successfully!');
            result(null, res);
        }
    })
};

//Delete Class by id
Class.deleteClassById = (id, result) => {
    dbConn.query('UPDATE Class SET cla_isDelete = 1 WHERE cla_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Class Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Class;