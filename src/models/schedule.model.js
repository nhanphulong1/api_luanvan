var dbConn = require('../../config/db.config');

var Schedule = function(schedule) {
    this.cla_id = schedule.cla_id;
    this.loc_id = schedule.loc_id;
    this.day_id = schedule.day_id;
    this.shi_id = schedule.shi_id;
    this.sche_quantity = schedule.sche_quantity;
    // this.created_at = new Date();
    // this.updated_at = new Date();
}



//get Schedule by id
Schedule.getScheduleByClassId = (id, result) => {
    dbConn.query(`Select * from schedules s join days d on s.day_id = d.day_id
        join shifts sh on sh.shi_id = s.shi_id
        join locations l on l.loc_id = s.loc_id
        join class c on c.cla_id = s.cla_id
        where c.cla_id = ?
        ORDER BY d.day_id, sh.shi_id`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching Schedule by Class id', err);
            result(null, err);
        } else {
            console.log('Schedule by id fetching successfully');
            result(null, res);
        }
    })
}

//get Schedule by id
Schedule.isValidSchedule = (loc_id, shi_id, sche_quantity, day_id, result) => {
    dbConn.query(`Select * from schedules s join days d on s.day_id = d.day_id
        join shifts sh on sh.shi_id = s.shi_id
        join locations l on l.loc_id = s.loc_id
        join class c on c.cla_id = s.cla_id
        where cla_status = 0 AND l.loc_id=? AND s.shi_id+s.sche_quantity>? AND s.shi_id<?+? AND d.day_id=?`, [loc_id, shi_id, shi_id, sche_quantity, day_id], (err, res) => {
        if (err) {
            console.log('Error while fetching Schedule by Class id', err);
            result(null, err);
        } else {
            console.log('Schedule by id fetching successfully');
            result(null, res);
        }
    })
}



//create new Schedule
Schedule.createSchedule = (ScheduleReqData, result) => {
    dbConn.query('INSERT INTO Schedules SET ? ', ScheduleReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data', err);
            result(err, null);
        } else {
            console.log('Schedule created successfully!');
            result(null, res)
        }
    })
}

//Delete Schedule by id
Schedule.deleteScheduleById = (id, result) => {
    dbConn.query('DELETE FROM Schedules WHERE sche_id = ? ', [id], (err, res) => {
        if (err) {
            console.log('Error while updating data');
            result(err, null);
        } else {
            console.log('Schedule Deleted successfully!');
            result(null, res)
        }
    });
}

module.exports = Schedule;