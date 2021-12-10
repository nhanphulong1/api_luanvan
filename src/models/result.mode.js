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
            result(null, res)
        }
    })
}

//create new Result
Result.createMultiResult = (data, result) => {
    let add = '';
    for (let index = 0; index < data.length; index++) {
        if (index == data.length - 1) {
            add = add + "(" + data[index].es_id + "," + data[index].re_theory + "," + data[index].re_theoryTotal + "," + data[index].re_theoryResult + "," +
                data[index].re_practice + "," + data[index].re_practiceTotal + "," + data[index].re_practiceResult + "," + data[index].re_result + ")";
        } else {
            add = add + "(" + data[index].es_id + "," + data[index].re_theory + "," + data[index].re_theoryTotal + "," + data[index].re_theoryResult + "," +
                data[index].re_practice + "," + data[index].re_practiceTotal + "," + data[index].re_practiceResult + "," + data[index].re_result + "),\n";
        }
    };
    let query = `INSERT INTO Results(es_id,re_theory,re_theoryTotal,re_theoryResult,re_practice,re_practiceTotal,re_practiceResult,re_result) VALUES ` + add;
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while inserting data', err);
            result(err, null);
        } else {
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
            result(null, res);
        }
    })
};

//Delete Result by id
Result.deleteResult = (id, result) => {
    dbConn.query('DELETE FROM results WHERE es_id IN (?) ', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting data', err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
}

module.exports = Result;