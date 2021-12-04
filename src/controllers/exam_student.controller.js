const ExamStudentModel = require('../models/exam_student.model');

//get Student by Exams
exports.getStudentByExams = (req, res) => {
    ExamStudentModel.getStudentByExam(req.params.id, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Student Exams Selected Successfully!', data: Exams });
    })
}

//get Student by course
exports.getStudentByCourses = (req, res) => {
    ExamStudentModel.getStudentByCourse(req.params.id, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Student Exams Selected Successfully!', data: Exams });
    })
}

// //create new Exams
exports.createExamStudent = (req, res) => {
    let data = req.body.arrStudent;
    ExamStudentModel.createExamStudent(req.body.ex_id, data, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Exam Student Created Successfully!', data: Exams });
    });
}

// //update new Exams
// exports.updateExamsById = (req, res) => {
//     const ExamsReqData = new ExamsModel(req.body);
//     // check null
//     if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
//         return req.send(400).send({ status: 0, message: 'Please fill all fields' });
//     } else {
//         ExamsModel.updateExamsById(req.params.id, ExamsReqData, (err, Exams) => {
//             if (err) {
//                 return res.json({ status: 0, message: err });
//             }
//             return res.json({ status: 1, message: 'Exams Updated Successfully!', data: Exams });
//         });
//     }
// }

// //delete Exams
// exports.deleteExams = (req, res) => {
//     ExamsModel.deleteExams(req.params.id, (err, Exams) => {
//         if (err) {
//             return res.json({ status: 0, message: err });
//         }
//         return res.json({ status: 1, message: 'Exams Deleted Successfully!' });
//     })
// }