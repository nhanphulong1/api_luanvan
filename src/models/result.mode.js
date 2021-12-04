var dbConn = require('../../config/db.config');

var Result = function(Result) {
    this.es_id = Result.es_id;
    this.re_theory = Result.re_theory;
    this.re_theoryTotal = Result.re_theoryTotal;
    this.re_theoryResult = Result.re_theoryResult;
    this.re_practice = Result.re_practice;
    this.re_practiceTotal = Result.re_practiceTotal;
    this.re_practiceResult = Result.re_practiceResult;
    this.re_result = Result.re_result;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get Result by id
Result.getResultById = (id, result) => {
    dbConn.query(`Select * From Results where es_id=?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Result by id', err);
            result(err, null);
        } else {
            console.log('Result by id fetching successfully');
            result(null, res);
        }
    })
}

//create new Result
Result.createResult = (ResultReqData, result) => {
    dbConn.query('INSERT INTO Results SET ? ', ResultReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('Result created successfully!');
            result(null, res)
        }
    })
}

//update Result by id
Result.updateResultById = (id, ResultReqData, result) => {
    dbConn.query('UPDATE Results SET re_theory=?,re_theoryTotal=?,re_theoryResult=?,re_practice=?,re_practiceTotal=?,re_practiceResult=?,re_result=?,updated_at=? WHERE es_id = ?', [ResultReqData.re_theory,
        ResultReqData.re_theoryTotal,
        ResultReqData.re_theoryResult,
        ResultReqData.re_practice,
        ResultReqData.re_practiceTotal,
        ResultReqData.re_practiceResult,
        ResultReqData.re_result,
        ResultReqData.updated_at,
        id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data', err);
            result(err, null);
        } else {
            console.log('Result updated successfully!');
            result(null, res);
        }
    })
};

//Delete Result by id
Result.deleteResultById = (id, result) => {
    dbConn.query('DELETE FROM results WHERE es_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting data');
            result(err, null);
        } else {
            console.log('Result Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Result;