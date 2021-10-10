const ScheduleModel = require('../models/Schedule.model');

//get Schedule by ID
exports.getScheduleById = (req, res) => {
    console.log('get Schedule by Id');
    ScheduleModel.getScheduleByClassId(req.params.id, (err, Schedule) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Schedule By ID Seleted Successfully!', data: Schedule });
    })
}

//check Schedule
exports.checkSchedule = (req, res) => {
    ScheduleModel.isValidSchedule(req.body.loc_id, req.body.shi_id, req.body.sche_quantity, req.body.day_id, (err, Schedule) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        if (Schedule.length == 0) {
            console.log(Schedule);
            return res.json({ status: 1, valid: 1 })
        }
        return res.json({ status: 1, valid: 0 });
    })
}




//create new Schedule
exports.createSchedule = (req, res) => {
    console.log('create new Schedule', req.body);
    const ScheduleReqData = new ScheduleModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        ScheduleModel.createSchedule(ScheduleReqData, (err, Schedule) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Schedule Created Successfully!', data: Schedule });
        });
    }
}

//Delete Schedule by id
exports.deleteSchedule = (req, res) => {
    console.log('delete Schedule here');
    ScheduleModel.deleteScheduleById(req.params.id, (err, Schedule) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Schedule Deleted Successfully!' });
    });
}