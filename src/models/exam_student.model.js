var dbConn = require('../../config/db.config');

var ExamStudent = function(examStudent) {
    this.ex_id = examStudent.ex_id;
    this.stu_id = examStudent.stu_id;
}

//get Exams by class
ExamStudent.getStudentByExam = (id, result) => {
    dbConn.query(`Select *, es.es_id From exam_student es
    Join exams ex ON es.ex_id = ex.ex_id
    Join students s ON es.stu_id = s.stu_id
    Join Details de on s.stu_id = de.stu_id
    Join Class c on c.cla_id = de.cla_id
    LEFT JOIN Teachers t on t.tea_id = c.tea_id
    Left Join results re ON re.es_id = es.es_id
    WHERE es.ex_id = ?
    ORDER BY s.stu_code`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}


//get Exams by class
ExamStudent.getStudentByCourse = (id, result) => {
    dbConn.query(`SELECT *, s.stu_id FROM courses co
    Join Class c on c.cou_id = co.cou_id
    Join Details de on de.cla_id = c.cla_id
    join Students s on s.stu_id = de.stu_id
    LEFT JOIN Teachers t on t.tea_id = c.tea_id
    LEFT Join attendance a on a.stu_id = s.stu_id
    LEFT Join exam_student es on es.stu_id = s.stu_id
    WHERE c.cla_status = 1 AND es.es_id IS NULL AND co.cou_id=?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}



//create Exams
ExamStudent.createExamStudent = (id, data, result) => {
    let add = '';
    for (let index = 0; index < data.length; index++) {
        if (index == data.length - 1) {
            add = add + "(" + id + "," + data[index].stu_id + ")";
        } else {
            add = add + "(" + id + "," + data[index].stu_id + "),\n";
        }
    };
    let query = `INSERT INTO exam_student(ex_id,stu_id) VALUES ` + add;
    console.log(query);
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching Exams', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

// //update Exams
// Exams.updateExamsById = (id, ExamsReq, result) => {
//     dbConn.query(`UPDATE Exams SET cou_id=?,ex_date=?,ex_location=?,updated_at=? WHERE ex_id = ?`, [ExamsReq.cou_id, ExamsReq.ex_date, ExamsReq.ex_location, ExamsReq.updated_at, id], (err, res) => {
//         if (err) {
//             console.log('Error while fetching Exams', err);
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     })
// }

// //Delete Exams
// ExamStudent.deleteExams = (id, result) => {
//     dbConn.query(`Delete from Exams Where ex_id = ?`, id, (err, res) => {
//         if (err) {
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     })
// }

module.exports = ExamStudent;