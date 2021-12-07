const AttendanceModel = require('../models/attendance.mode');

//get Attendance by class
exports.getAttendanceByDiaries = (req, res) => {
    AttendanceModel.getAttendanceByDiaries(req.params.di_id, req.params.cla_id, (err, Attendance) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Attendance Selected Successfully!', data: Attendance });
    })
}

//get Attendance by class
exports.getAttendanceByStudent = (req, res) => {
    AttendanceModel.getAttendanceByStudent(req.params.di_id, req.params.stu_id, (err, Attendance) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Attendance Selected Successfully!', data: Attendance });
    })
}

// //get Attendance by teacher
// exports.getAttendanceByTeacher = (req, res) => {
//     AttendanceModel.getAttendanceByTeacher(req.params.id, (err, Attendance) => {
//         if (err) {
//             return res.json({ status: 0, message: err });
//         }
//         return res.json({ status: 1, message: 'Attendance Selected Successfully!', data: Attendance });
//     })
// }

//create new Attendance
exports.createAttendance = (req, res) => {
    const AttendanceReqData = new AttendanceModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        AttendanceModel.createAttendance(AttendanceReqData, (err, Attendance) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Attendance Created Successfully!', data: Attendance });
        });
    }
}

//delete Attendance
exports.deleteAttendance = (req, res) => {
    AttendanceModel.deleteAttendance(req.params.id, (err, Attendance) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Attendance Deleted Successfully!' });
    })
}