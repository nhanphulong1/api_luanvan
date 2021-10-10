var dbConn = require('../../config/db.config');

var Class = function(Class) {
    this.cla_name = Class.cla_name;
    this.cla_fee = Class.cla_fee;
    this.cla_start = Class.cla_start;
    this.cla_status = Class.cla_status;
    this.cla_quantity = Class.cla_quantity;
    this.cla_count = Class.cla_count;
    this.cla_isDelete = Class.cla_isDelete;
    this.cou_id = Class.cou_id;
    this.tea_id = Class.tea_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get all Class
Class.getAllClass = (result) => {
    dbConn.query(`SELECT *,c.cla_id, count(de.de_id) as cla_number FROM class c 
    join courses co on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    WHERE cla_isDelete != 1
    GROUP BY c.cla_id
    ORDER BY c.cla_id DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching Class', err);
            result(null, err);
        } else {
            console.log('Class fetching successfully');
            result(null, res);
        }
    })
}

//get all Class Search
Class.getSearchClass = (name, course, status, result) => {
    dbConn.query(`SELECT *,c.cla_id, count(de.de_id) as cla_number FROM class c 
    join courses co on c.cou_id = co.cou_id
    left join details de on de.cla_id = c.cla_id
    WHERE c.cla_name LIKE ? AND co.cou_id LIKE ? AND cla_status LIKE ? AND cla_isDelete != 1
    GROUP BY c.cla_id
    ORDER BY c.cla_id DESC`, [name, course, status], (err, res) => {
        if (err) {
            console.log('Error while fetching Class', err);
            result(null, err);
        } else {
            console.log('Class fetching successfully');
            result(null, res);
        }
    })
}


//get Class by id
Class.getClassById = (id, result) => {
    dbConn.query(`SELECT *,c.cla_id, count(de.de_id) as cla_number FROM class c 
        join courses co on c.cou_id = co.cou_id
        left join details de on de.cla_id = c.cla_id
        WHERE cla_isDelete != 1 AND c.cla_id = ?
        GROUP BY c.cla_id`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(null, err);
        } else {
            console.log('Class by id fetching successfully');
            result(null, res);
        }
    })
}

//get Class by Teacher
Class.getClassByTeacher = (id, result) => {
    dbConn.query('SELECT * FROM Class Join Courses On Class.cou_id = Courses.cou_id Where tea_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(null, err);
        } else {
            console.log('Class by id fetching successfully');
            result(null, res);
        }
    })
}

//get Class by course
Class.getClassByCourse = (id, result) => {
    dbConn.query('SELECT * FROM Class Join Courses On Class.cou_id = Courses.cou_id Where Courses.cou_id = ? AND cla_status = 0', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by course', err);
            result(null, err);
        } else {
            console.log('Class by course fetching successfully');
            result(null, res);
        }
    })
}


//get student by class
Class.getStudentByClass = (id, result) => {
    dbConn.query(`SELECT * from class c join details de on c.cla_id = de.cla_id
        join Students s on s.stu_id = de.stu_id
        where c.cla_id = ? and cla_isDelete != 1;`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Class by id', err);
            result(null, err);
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
    dbConn.query('UPDATE Class SET cla_name=?,cla_fee=?,cla_start=?,cla_quantity=?,cla_count=?,cou_id=?,updated_at=? WHERE cla_id = ?', [ClassReqData.cla_name,
        ClassReqData.cla_fee,
        ClassReqData.cla_start,
        ClassReqData.cla_quantity,
        ClassReqData.cla_count,
        ClassReqData.cou_id,
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
Class.completeClassById = (id, ClassReqData, result) => {
    dbConn.query('UPDATE Class SET cla_status=?,updated_at=? WHERE cla_id = ?', [
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