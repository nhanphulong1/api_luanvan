const ExamsModel = require('../models/exam.model');

//get Exams by class
exports.getExamsById = (req, res) => {
    ExamsModel.getExamsByID(req.params.id, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Exams Selected Successfully!', data: Exams });
    })
}

//get Exams by course
exports.getExamsByCourse = (req, res) => {
    ExamsModel.getExamsByCourse(req.params.id, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Exams Selected Successfully!', data: Exams });
    })
}

//get All Exams
exports.getAllExams = (req, res) => {
    ExamsModel.getAllExams(req.params.id, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Exams Selected Successfully!', data: Exams });
    })
}

//search Exams
exports.searchExams = (req, res) => {
    let data = {
        cou_id: '',
        ex_date: '',
        ex_location: ''
    };
    console.log('date: ', req.body.ex_date);
    if (req.body.cou_id != '') {
        data.cou_id = ' AND co.cou_id = ' + req.body.cou_id;
    }
    if (req.body.ex_date != null) {
        data.ex_date = " AND ex_date = '" + req.body.ex_date + "'";
    };
    if (req.body.ex_location != '') {
        data.ex_location = req.body.ex_location;
    };
    ExamsModel.searchExam(data, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Exams search Successfully!', data: Exams });
    })
}

//create new Exams
exports.createExams = (req, res) => {
    const ExamsReqData = new ExamsModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ExamsModel.createExams(ExamsReqData, (err, Exams) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Exams Created Successfully!', data: Exams });
        });
    }
}

//update new Exams
exports.updateExamsById = (req, res) => {
    const ExamsReqData = new ExamsModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ExamsModel.updateExamsById(req.params.id, ExamsReqData, (err, Exams) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Exams Updated Successfully!', data: Exams });
        });
    }
}

//delete Exams
exports.deleteExams = (req, res) => {
    ExamsModel.deleteExams(req.params.id, (err, Exams) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Exams Deleted Successfully!' });
    })
}