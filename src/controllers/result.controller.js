const ResultModel = require('../models/result.mode');


//get Result by ID
exports.getResultById = (req, res) => {
    ResultModel.getResultById(req.params.id, (err, Result) => {
        if (err)
            return res.status(500).json({ status: 0, message: err });
        res.json({ status: 1, message: 'Result Seleted Successfully!', data: Result });
    })
}

//create Result
exports.createResult = (req, res) => {
    let ResultReq = new ResultModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ResultModel.createResult(ResultReq, (err, Result) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Create Result Successfully!', data: Result });
        });
    }
}

//create Result
exports.createMultiResult = (req, res) => {
    let arrResult = req.body.arrResult;
    let arrDelete = req.body.arrDelete;
    if (arrDelete.length > 0) {
        ResultModel.deleteResult(arrDelete, (err, result) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
        })
    }
    ResultModel.createMultiResult(arrResult, (err, result) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Create Result Successfully!' });
    });
}


//Update Result
exports.updateResult = (req, res) => {
    let ResultReq = new ResultModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ResultModel.updateResultById(req.params.id, ResultReq, (err, Result) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Updated Result Successfully!' });
        });
    }
}

//Delete Result
exports.deleteResult = (req, res) => {
    ResultModel.deleteResult(req.params.id, (err, Result) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Result Deleted Successfully!' });
    });
}