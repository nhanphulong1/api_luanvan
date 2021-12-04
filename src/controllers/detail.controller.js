const DetailModel = require('../models/Detail.model');


// // get all Detail list
// exports.getDetailList = (req, res) => {
//     // console.log('Detail list here!');
//     DetailModel.getAllDetail((err, Detail) => {
//         console.log('Detail list here!');
//         //if failue !!
//         if (err) {
//             return res.status(500).json({ status: 0, message: err });
//         }
//         return res.json({ status: 1, message: 'Detail Selected All Successfully!', data: Detail });
//     })
// };

//get Detail by ID
exports.getDetailById = (req, res) => {
    console.log('get Detail by Id');
    DetailModel.getDetailById(req.params.id, (err, Detail) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Detail By ID Seleted Successfully!', data: Detail });
    })
}

//get Detail by ID
exports.checkValidDetail = (req, res) => {
    DetailModel.checkValid(req.params.id, (err, Detail) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        // console.log("detail: ", Detail);
        if (Detail.length > 0) {
            return res.json({ status: 1, valid: 0 });
        }
        return res.json({ status: 1, valid: 1 });
    })
}

//create new Detail
exports.createDetail = (req, res) => {
    console.log('create new Detail', req.body);
    const DetailReqData = new DetailModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        DetailModel.createDetail(DetailReqData, (err, Detail) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Detail Created Successfully!', data: Detail });
        });
    }
}


//Update Detail by id
exports.updateDetail = (req, res) => {
    console.log('update Detail by id:', req.body);
    const DetailReqData = new DetailModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        DetailModel.updateDetailById(req.params.id, DetailReqData, (err, Detail) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Detail Updated Successfully!' });
        });
    }
}

//Delete Detail by id
exports.deleteDetail = (req, res) => {
    console.log('delete Detail here');
    DetailModel.deleteDetailById(req.params.id, (err, Detail) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Detail Deleted Successfully!' });
    });
}