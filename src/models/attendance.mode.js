var dbConn = require('../../config/db.config');

var Attendance = function(Attendance) {
    this.di_id = Attendance.di_id;
    this.stu_id = Attendance.stu_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}


//get Attendance by class
Attendance.getAttendanceByDiaries = (di_id, result) => {
    dbConn.query(`Select * From Students s
        JOIN Attendance att ON s.stu_id = att.stu_id
        WHERE di_id=?
    `, [di_id], (err, res) => {
        if (err) {
            console.log('Error while fetching Attendance', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}


//get Attendance by class
Attendance.getAttendanceByStudent = (di_id, stu_id, result) => {
    dbConn.query(`Select * From Students s
        JOIN Attendance att ON s.stu_id = att.stu_id
        JOIN Diaries di ON att.di_id = di.di_id
        WHERE s.stu_id = ? AND di.di_id=?
    `, [stu_id, di_id], (err, res) => {
        if (err) {
            console.log('Error while fetching Attendance', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

// //get Attendance by class
// Attendance.getAttendanceByTeacher = (id, result) => {
//     dbConn.query(`Select * From Attendance di
//     Join Class c on c.cla_id = di.cla_id
//     Where c.tea_id = ?
//     ORDER BY di_id DESC`, id, (err, res) => {
//         if (err) {
//             console.log('Error while fetching Attendance', err);
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     })
// }


//create Attendance
Attendance.createAttendance = (AttendanceReq, result) => {
    dbConn.query(`INSERT INTO Attendance SET ?`, AttendanceReq, (err, res) => {
        if (err) {
            console.log('Error while fetching Attendance', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//Delete Attendance
Attendance.deleteAttendance = (id, result) => {
    dbConn.query(`Delete from Attendance Where att_id = ?`, id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = Attendance;