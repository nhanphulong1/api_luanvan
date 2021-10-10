var dbConn = require('../../config/db.config');

var Detail = function(detail) {
    this.de_status = detail.de_status;
    // this.de_result = detail.de_result;
    this.cla_id = detail.cla_id;
    this.stu_id = detail.stu_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

// //get all Detail
// Detail.getAllDetail = (result) => {
//     dbConn.query('SELECT * FROM Details', (err, res) => {
//         if (err) {
//             console.log('Error while fetching Detail', err);
//             result(err, null);
//         } else {
//             console.log('Detail fetching successfully');
//             result(null, res);
//         }
//     })
// }

//get Detail by id
Detail.getDetailById = (id, result) => {
    dbConn.query('SELECT * FROM Details Where de_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching Detail by id', err);
            result(err, null);
        } else {
            console.log('Detail by id fetching successfully');
            result(null, res);
        }
    })
}

//create new Detail
Detail.createDetail = (DetailReqData, result) => {
    dbConn.query('INSERT INTO Details SET ? ', DetailReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(err, null);
        } else {
            console.log('Detail created successfully!');
            result(null, res)
        }
    })
}


//update Detail by id
Detail.updateDetailById = (id, DetailReqData, result) => {
    if (!DetailReqData.tea_id) {
        DetailReqData.tea_id = Null;
    }
    dbConn.query('UPDATE Details SET de_date=?,de_status=?,de_result=?,cou_id=?,stu_id=?,updated_at=? WHERE de_id = ?', [DetailReqData.de_date,
        DetailReqData.de_status,
        DetailReqData.de_result,
        DetailReqData.cou_id,
        DetailReqData.stu_id,
        DetailReqData.updated_at,
        id
    ], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Detail updated successfully!');
            result(null, res);
        }
    })
};

//Delete Detail by id
Detail.deleteDetailById = (id, result) => {
    dbConn.query('DELETE FROM Details WHERE de_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Detail Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Detail;