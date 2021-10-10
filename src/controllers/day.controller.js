const DayModel = require('../models/Day.model');

//get Day by ID
exports.getAllDay = (req, res) => {
    DayModel.getAllDay((err, Day) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Day Seleted Successfully!', data: Day });
    })
}