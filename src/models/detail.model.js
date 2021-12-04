var dbConn = require('../../config/db.config');

var Detail = function(detail) {
    this.de_status = detail.de_status;
    // this.de_paidFee = detail.de_paidFee;
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

//get Detail by id
Detail.checkValid = (id, result) => {
    dbConn.query(`Select * from details de 
        right join students s on de.stu_id = s.stu_id
        join class c on c.cla_id = de.cla_id
        where cla_status = 0 and s.stu_id = ?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Detail check valid', err);
            result(err, null);
        } else {
            console.log('check valid!');
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
    dbConn.query('UPDATE Details SET de_status=?,cla_id=?,stu_id=?,updated_at=? WHERE de_id = ?', [
        DetailReqData.de_status,
        // DetailReqData.de_paidFee,
        DetailReqData.cla_id,
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