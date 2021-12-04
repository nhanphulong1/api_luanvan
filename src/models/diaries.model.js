var dbConn = require('../../config/db.config');

var Diaries = function(diaries) {
    this.di_content = diaries.di_content;
    this.di_date = diaries.di_date;
    this.di_type = diaries.di_type;
    this.di_start = diaries.di_start;
    this.di_end = diaries.di_end;
    this.di_location = diaries.di_location;
    this.di_status = diaries.di_status;
    this.cla_id = diaries.cla_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get Diaries by ID
Diaries.getDiariesByID = (id, result) => {
    dbConn.query(`Select * From Diaries WHERE di_id = ?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Diaries', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get Diaries by class
Diaries.getDiariesByClass = (id, result) => {
    dbConn.query(`Select * From Diaries di
    Join Class c on c.cla_id = di.cla_id
    Where c.cla_id = ?
    ORDER BY di_id DESC`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Diaries', err);
            result(err, null);
        } else {
            console.log('Diaries fetching successfully');
            result(null, res);
        }
    })
}

//get Diaries by teacher
Diaries.getDiariesByTeacher = (id, result) => {
    dbConn.query(`Select * From Diaries di
    Join Class c on c.cla_id = di.cla_id
    Where c.tea_id = ?
    ORDER BY di_id DESC`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Diaries', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}


//create Diaries
Diaries.createDiaries = (DiariesReq, result) => {
    dbConn.query(`INSERT INTO Diaries SET ?`, DiariesReq, (err, res) => {
        if (err) {
            console.log('Error while fetching Diaries', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//create Diaries
Diaries.updateStatusDiaries = (id, DiariesReq, result) => {
    dbConn.query(`UPDATE Diaries SET di_status=?,updated_at=? WHERE di_id = ?`, [DiariesReq.di_status, DiariesReq.updated_at, id], (err, res) => {
        if (err) {
            console.log('Error while fetching Diaries', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//Delete Diaries
Diaries.deleteDiaries = (id, result) => {
    dbConn.query(`Delete from Diaries Where di_id = ?`, id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = Diaries;