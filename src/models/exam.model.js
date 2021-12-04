var dbConn = require('../../config/db.config');

var Exams = function(exams) {
    this.cou_id = exams.cou_id;
    this.ex_date = exams.ex_date;
    this.ex_location = exams.ex_location;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get Exams by ID
Exams.getExamsByID = (id, result) => {
    dbConn.query(`Select * From Exams ex
    Join Courses co ON co.cou_id = ex.cou_id
    WHERE ex.ex_id = ?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get Exams by class
Exams.getExamsByCourse = (id, result) => {
    dbConn.query(`Select * From Exams ex
    Join Courses co ON co.cou_id = ex.cou_id
    Where co.cou_id = ?
    ORDER BY ex_id DESC`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get Exams by teacher
Exams.getAllExams = (id, result) => {
    dbConn.query(`Select * From Exams ex
    Join Courses co ON co.cou_id = ex.cou_id
    WHERE ex_isDelete = 0
    ORDER BY ex_id DESC`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

Exams.searchExam = (data, result) => {
    let query = `Select * From Exams ex
        Join Courses co ON co.cou_id = ex.cou_id
        Where ex_isDelete = 0 AND ex_location LIKE '%` + data.ex_location + `%' ` + data.ex_date + data.cou_id + `
        ORDER BY ex_id DESC`;
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}


//create Exams
Exams.createExams = (ExamsReq, result) => {
    dbConn.query(`INSERT INTO Exams SET ?`, ExamsReq, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//update Exams
Exams.updateExamsById = (id, ExamsReq, result) => {
    dbConn.query(`UPDATE Exams SET cou_id=?,ex_date=?,ex_location=?,updated_at=? WHERE ex_id = ?`, [ExamsReq.cou_id, ExamsReq.ex_date, ExamsReq.ex_location, ExamsReq.updated_at, id], (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//Delete Exams
Exams.deleteExams = (id, result) => {
    dbConn.query(`UPDATE Exams SET ex_isDelete = 1 WHERE ex_id=?`, id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = Exams;