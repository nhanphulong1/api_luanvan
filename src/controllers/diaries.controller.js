const DiariesModel = require('../models/diaries.model');

//get Diaries by class
exports.getDiariesById = (req, res) => {
    DiariesModel.getDiariesByID(req.params.id, (err, Diaries) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Diaries Selected Successfully!', data: Diaries });
    })
}

//get Diaries by class
exports.getDiariesByClass = (req, res) => {
    DiariesModel.getDiariesByClass(req.params.id, (err, Diaries) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Diaries Selected Successfully!', data: Diaries });
    })
}

//get Diaries by teacher
exports.getDiariesByTeacher = (req, res) => {
    DiariesModel.getDiariesByTeacher(req.params.id, (err, Diaries) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Diaries Selected Successfully!', data: Diaries });
    })
}

//create new Diaries
exports.createDiaries = (req, res) => {
    const DiariesReqData = new DiariesModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        DiariesModel.createDiaries(DiariesReqData, (err, Diaries) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Diaries Created Successfully!', data: Diaries });
        });
    }
}

//create new Diaries
exports.updateStatusDiaries = (req, res) => {
    const DiariesReqData = new DiariesModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        DiariesModel.updateStatusDiaries(req.params.id, DiariesReqData, (err, Diaries) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Diaries Updated Successfully!', data: Diaries });
        });
    }
}

//delete Diaries
exports.deleteDiaries = (req, res) => {
    DiariesModel.deleteDiaries(req.params.id, (err, Diaries) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Diaries Deleted Successfully!' });
    })
}